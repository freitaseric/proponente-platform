import { createFileRoute } from '@tanstack/react-router';
import { ArrowRight, Check, ShieldCheck, Users } from 'lucide-react';

export const Route = createFileRoute('/planos')({
	component: RouteComponent,
});

const plans = [
	{
		name: 'Essencial',
		description: 'Para equipes começando a organizar a captação.',
		price: 'Sob consulta',
		features: [
			'Banco de editais',
			'Pipeline de projetos',
			'Calendário de prazos',
			'Alertas básicos',
		],
	},
	{
		name: 'Profissional',
		description: 'Para operações com múltiplos projetos e responsáveis.',
		price: 'Mais escolhido',
		features: [
			'Tudo do Essencial',
			'Indicadores financeiros',
			'Relatórios gerenciais',
			'Organizações e contatos',
			'Fluxos por equipe',
		],
		highlighted: true,
	},
	{
		name: 'Institucional',
		description: 'Para organizações, redes e órgãos com governança avançada.',
		price: 'Personalizado',
		features: [
			'Tudo do Profissional',
			'Suporte de implantação',
			'Perfis e fluxos customizados',
			'Acompanhamento estratégico',
		],
	},
];

function RouteComponent() {
	return (
		<main className="bg-background text-foreground">
			<section className="bg-white">
				<div className="mx-auto max-w-[1504px] px-6 py-20 lg:px-8">
					<p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
						Planos
					</p>
					<div className="mt-4 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
						<div>
							<h1 className="text-4xl font-bold tracking-normal md:text-6xl">
								Escolha o nível certo para sua operação de captação.
							</h1>
						</div>
						<p className="text-lg leading-8 text-muted-foreground">
							Planos pensados para acompanhar maturidade, volume de projetos e
							necessidade de suporte. No início, a melhor conversa é entender
							seu fluxo e montar a implantação sem excesso.
						</p>
					</div>
				</div>
			</section>

			<section className="mx-auto max-w-[1504px] px-6 py-20 lg:px-8">
				<div className="grid gap-5 lg:grid-cols-3">
					{plans.map(plan => (
						<div
							key={plan.name}
							className={[
								'rounded-lg border bg-card p-7',
								plan.highlighted
									? 'border-primary shadow-xl shadow-primary/10'
									: 'border-border',
							].join(' ')}>
							{plan.highlighted ? (
								<p className="mb-4 inline-flex rounded-md bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
									Recomendado
								</p>
							) : null}
							<h2 className="text-xl font-semibold">{plan.name}</h2>
							<p className="mt-3 text-sm leading-6 text-muted-foreground">
								{plan.description}
							</p>
							<p className="mt-6 text-2xl font-bold text-primary">
								{plan.price}
							</p>
							<ul className="mt-6 grid gap-3 text-sm">
								{plan.features.map(feature => (
									<li
										key={feature}
										className="flex items-center gap-3">
										<Check className="size-4 text-primary" />
										{feature}
									</li>
								))}
							</ul>
							<a
								href="/#demonstracao"
								className={[
									'mt-7 inline-flex h-11 w-full items-center justify-center rounded-md text-sm font-semibold',
									plan.highlighted
										? 'bg-primary text-primary-foreground'
										: 'border border-primary text-primary',
								].join(' ')}>
								Solicitar demonstração
							</a>
						</div>
					))}
				</div>
			</section>

			<section className="bg-white">
				<div className="mx-auto grid max-w-[1504px] gap-5 px-6 py-20 md:grid-cols-3 lg:px-8">
					<ValueCard
						icon={Users}
						title="Implantação guiada"
						description="Ajuste o Proponente Digital ao seu fluxo real de captação, sem forçar a equipe a caber em uma ferramenta genérica."
					/>
					<ValueCard
						icon={ShieldCheck}
						title="Governança desde o início"
						description="Perfis, rastreabilidade e dados organizados para operação, diretoria e prestação de contas."
					/>
					<ValueCard
						icon={ArrowRight}
						title="Evolução por etapa"
						description="Comece com o essencial e avance para relatórios, indicadores e processos mais maduros quando fizer sentido."
					/>
				</div>
			</section>
		</main>
	);
}

function ValueCard({
	icon: Icon,
	title,
	description,
}: {
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	description: string;
}) {
	return (
		<article className="rounded-lg border border-border bg-card p-7">
			<Icon className="size-9 text-primary" />
			<h2 className="mt-5 text-xl font-semibold">{title}</h2>
			<p className="mt-3 text-sm leading-6 text-muted-foreground">
				{description}
			</p>
		</article>
	);
}
