use tauri::Manager;

fn open_auth_callback(app: &tauri::AppHandle, url: &str) {
    let Some(query) = url.split_once('?').map(|(_, query)| query) else {
        return;
    };

    let script = format!(
        "window.location.hash = {};",
        serde_json::to_string(&format!("/auth/callback?{query}")).unwrap_or_default()
    );

    if let Some(window) = app.get_webview_window("main") {
        let _ = window.show();
        let _ = window.unminimize();
        let _ = window.set_focus();
        let _ = window.eval(&script);
    }
}

fn ensure_app_dirs(app: &tauri::App) -> Result<(), Box<dyn std::error::Error>> {
    let app_data_dir = app.path().app_data_dir()?;

    for dir in ["documents", "exports", "cache", "tmp"] {
        std::fs::create_dir_all(app_data_dir.join(dir))?;
    }

    Ok(())
}

pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_single_instance::init(|app, _args, _cwd| {
            if let Some(window) = app.get_webview_window("main") {
                let _ = window.show();
                let _ = window.unminimize();
                let _ = window.set_focus();
            }
        }))
        .plugin(tauri_plugin_deep_link::init())
        .plugin(
            tauri_plugin_window_state::Builder::default()
                .with_state_flags(
                    tauri_plugin_window_state::StateFlags::SIZE
                        | tauri_plugin_window_state::StateFlags::POSITION
                        | tauri_plugin_window_state::StateFlags::MAXIMIZED,
                )
                .build(),
        )
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_log::Builder::new().build())
        .on_window_event(|window, event| {
            if window.label() == "main" {
                if let tauri::WindowEvent::CloseRequested { .. } = event {
                    window.app_handle().exit(0);
                }
            }
        })
        .setup(|app| {
            ensure_app_dirs(app)?;

            #[cfg(desktop)]
            {
                use tauri_plugin_deep_link::DeepLinkExt;

                let app_handle = app.handle().clone();

                #[cfg(debug_assertions)]
                app.deep_link().register("proponente")?;

                app.deep_link().on_open_url(move |event| {
                    for url in event.urls() {
                        if url.scheme() == "proponente" && url.host_str() == Some("auth") {
                            open_auth_callback(&app_handle, url.as_str());
                        }
                    }
                });
            }

            #[cfg(desktop)]
            app.handle()
                .plugin(tauri_plugin_updater::Builder::new().build())?;

            if let Some(window) = app.get_webview_window("main") {
                let _ = window.show();
            }

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
