import { createFileRoute } from '@tanstack/react-router';
import { Building2, LockKeyhole, Mail, ShieldCheck } from 'lucide-react';

export const Route = createFileRoute('/sobre')({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<main className="bg-background text-foreground">
			<section className="bg-white">
				<div className="mx-auto max-w-[1504px] px-6 py-20 lg:px-8">
					<p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
						Empresa
					</p>
					<h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-normal md:text-6xl">
						Uma plataforma para profissionalizar a captação de recursos.
					</h1>
					<p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
						O Proponente Digital nasce para dar clareza operacional a organizações que
						lidam com editais, propostas, prazos, execução financeira e
						prestação de contas.
					</p>
					<div className="mt-8 flex flex-wrap gap-3">
						<a
							href="#sobre"
							className="rounded-md border border-primary px-4 py-2 text-sm font-semibold text-primary">
							Sobre
						</a>
						<a
							href="#seguranca"
							className="rounded-md border border-primary px-4 py-2 text-sm font-semibold text-primary">
							Segurança
						</a>
						<a
							href="#contato"
							className="rounded-md border border-primary px-4 py-2 text-sm font-semibold text-primary">
							Contato
						</a>
					</div>
				</div>
			</section>

			<section className="mx-auto grid max-w-[1504px] gap-6 px-6 py-20 lg:px-8">
				<InfoSection
					id="sobre"
					icon={Building2}
					title="Sobre o Proponente Digital"
					description="O Proponente Digital concentra o fluxo da captação em uma experiência de trabalho clara: oportunidades, propostas, projetos, recursos e comprovações conectados. A proposta é reduzir dependência de planilhas dispersas e criar uma memória operacional para equipes que precisam captar com consistência."
				/>
				<InfoSection
					id="seguranca"
					icon={LockKeyhole}
					title="Segurança"
					description="A plataforma considera autenticação segura, rastreabilidade de dados, organização por perfis e boas práticas de proteção de informações. O objetivo é apoiar rotinas com documentos, contatos e dados financeiros sensíveis sem perder controle institucional."
				/>
				<InfoSection
					id="contato"
					icon={Mail}
					title="Contato"
					description="Fale com o time para avaliar aderência, implantação, operação atual e próximos passos. A demonstração pode ser orientada ao seu tipo de organização, volume de projetos e maturidade da captação."
				/>
			</section>

			<section className="mx-auto max-w-[1504px] px-6 pb-20 lg:px-8">
				<div className="rounded-lg bg-primary p-8 text-primary-foreground lg:p-10">
					<ShieldCheck className="size-10" />
					<h2 className="mt-5 text-3xl font-bold tracking-normal">
						Captação com mais controle, menos ruído e mais previsibilidade.
					</h2>
					<p className="mt-4 max-w-2xl text-sm leading-6 text-primary-foreground/80">
						A operação melhora quando oportunidades, prazos e responsabilidades
						deixam de morar em conversas soltas.
					</p>
				</div>
			</section>
		</main>
	);
}

function InfoSection({
	id,
	icon: Icon,
	title,
	description,
}: {
	id: string;
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	description: string;
}) {
	return (
		<article
			id={id}
			className="scroll-mt-28 rounded-lg border border-border bg-card p-7">
			<Icon className="size-10 text-primary" />
			<h2 className="mt-5 text-2xl font-semibold">{title}</h2>
			<p className="mt-3 max-w-4xl text-base leading-8 text-muted-foreground">
				{description}
			</p>
		</article>
	);
}
