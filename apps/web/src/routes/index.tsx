import { createFileRoute, Link } from '@tanstack/react-router';
import {
	ArrowRight,
	BadgeCheck,
	BellRing,
	BookOpen,
	Briefcase,
	Building2,
	CalendarClock,
	ChartLine,
	Check,
	ClipboardCheck,
	FileSearch,
	FileText,
	Landmark,
	LayoutTemplate,
	Search,
	ShieldCheck,
	Users,
} from 'lucide-react';

export const Route = createFileRoute('/')({
	component: RouteComponent,
});

const heroBullets = [
	'Encontre e monitore editais alinhados a sua atuação',
	'Elabore propostas com mais agilidade e segurança',
	'Acompanhe prazos e etapas em tempo real',
	'Preste contas com organização e transparência',
];

const solutions = [
	{
		id: 'solucoes-monitoramento-editais',
		title: 'Monitoramento de editais',
		description:
			'Centralize editais públicos, privados e leis de incentivo em uma rotina de triagem clara, com filtros por área, território, valor e prazo.',
		icon: Search,
	},
	{
		id: 'solucoes-gestao-propostas',
		title: 'Gestão de propostas',
		description:
			'Transforme oportunidades em propostas acompanháveis, com responsáveis, documentos, histórico de decisões e status por etapa.',
		icon: FileText,
	},
	{
		id: 'solucoes-controle-prazos',
		title: 'Controle de prazos',
		description:
			'Reduza risco operacional com calendário, alertas e visão dos prazos que exigem ação da equipe nos próximos dias.',
		icon: CalendarClock,
	},
	{
		id: 'solucoes-recursos-captados',
		title: 'Gestão de recursos captados',
		description:
			'Acompanhe valores aprovados, repasses, execução financeira e saldos por projeto sem depender de planilhas soltas.',
		icon: ChartLine,
	},
	{
		id: 'solucoes-prestacao-contas',
		title: 'Execução e prestação de contas',
		description:
			'Organize comprovantes, relatórios, entregas e evidências desde o começo do projeto, não só na véspera da prestação.',
		icon: ClipboardCheck,
	},
];

const resources = [
	{
		id: 'recursos-banco-editais',
		title: 'Banco de editais',
		description: 'Editais catalogados por área, órgão, prazo, valor e status.',
		icon: FileSearch,
	},
	{
		id: 'recursos-pipeline-projetos',
		title: 'Pipeline de projetos',
		description:
			'Funil visual para acompanhar identificação, elaboração e análise.',
		icon: LayoutTemplate,
	},
	{
		id: 'recursos-calendario-prazos',
		title: 'Calendário de prazos',
		description:
			'Datas críticas, tarefas e marcos em uma agenda compartilhada.',
		icon: CalendarClock,
	},
	{
		id: 'recursos-documentos-anexos',
		title: 'Documentos e anexos',
		description:
			'Arquivos, versões e comprovantes vinculados ao projeto certo.',
		icon: FileText,
	},
	{
		id: 'recursos-indicadores-financeiros',
		title: 'Indicadores financeiros',
		description:
			'Visão de recursos captados, previstos, executados e pendentes.',
		icon: ChartLine,
	},
	{
		id: 'recursos-relatorios',
		title: 'Relatórios',
		description: 'Resumo executivo para gestão, diretoria e parceiros.',
		icon: BookOpen,
	},
	{
		id: 'recursos-organizacoes-contatos',
		title: 'Organizações e contatos',
		description: 'Base de parceiros, órgãos, patrocinadores e responsáveis.',
		icon: Building2,
	},
	{
		id: 'recursos-alertas-notificacoes',
		title: 'Alertas e notificações',
		description: 'Avisos para prazos, pendências, aprovações e tarefas.',
		icon: BellRing,
	},
];

const audiences = [
	{
		id: 'para-quem-captadores',
		title: 'Captadores de recursos',
		description:
			'Mais contexto para priorizar oportunidades, defender propostas e acompanhar aprovações.',
		icon: Briefcase,
	},
	{
		id: 'para-quem-oscs-associacoes',
		title: 'OSCs e associações',
		description:
			'Organização para equipes que precisam captar, executar e comprovar com poucos recursos administrativos.',
		icon: Users,
	},
	{
		id: 'para-quem-prefeituras',
		title: 'Prefeituras',
		description:
			'Controle de programas, convênios, editais e prestação de contas em um fluxo rastreável.',
		icon: Landmark,
	},
	{
		id: 'para-quem-consultores',
		title: 'Consultores de projetos',
		description:
			'Uma visão por cliente e por projeto para evitar retrabalho e profissionalizar a entrega.',
		icon: BadgeCheck,
	},
	{
		id: 'para-quem-equipes-administrativas',
		title: 'Equipes administrativas',
		description:
			'Menos busca manual por documentos e mais clareza sobre pendências, prazos e responsáveis.',
		icon: Building2,
	},
];

function RouteComponent() {
	return (
		<main className="bg-background text-foreground">
			<HeroSection />
			<FeatureStrip />
			<SolutionsSection />
			<ResourcesSection />
			<WorkflowSection />
			<AudienceSection />
			<DemoSection />
		</main>
	);
}

function HeroSection() {
	return (
		<section
			id="inicio"
			className="overflow-hidden bg-white">
			<div className="mx-auto grid min-h-[calc(100vh-5.5rem)] max-w-376 scroll-mt-28 items-center gap-12 px-6 py-12 lg:grid-cols-[0.88fr_1.12fr] lg:px-8 lg:py-16">
				<div className="max-w-2xl">
					<p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
						Proponente Digital
					</p>
					<h1 className="mt-5 text-4xl font-bold tracking-normal text-foreground md:text-6xl">
						Da oportunidade ao recurso recebido.
					</h1>
					<p className="mt-6 text-lg leading-8 text-muted-foreground">
						Organize editais, propostas, prazos e recursos captados em um só
						fluxo. O Proponente Digital dá clareza para equipes que precisam captar mais
						e prestar contas melhor.
					</p>

					<div className="mt-8 grid gap-4">
						{heroBullets.map(item => (
							<div
								key={item}
								className="flex items-start gap-3 text-sm text-foreground">
								<span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
									<Check className="size-4" />
								</span>
								<span className="pt-1.5">{item}</span>
							</div>
						))}
					</div>

					<div className="mt-9 flex flex-wrap gap-4">
						<a
							href="#demonstracao"
							className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-sm shadow-primary/20 transition hover:bg-primary/90">
							Solicitar demonstração
							<ArrowRight className="size-4" />
						</a>
						<a
							href="#recursos-banco-editais"
							className="inline-flex h-12 items-center justify-center rounded-md border border-primary bg-white px-6 text-sm font-semibold text-primary transition hover:bg-accent">
							Conhecer funcionalidades
						</a>
					</div>

					<p className="mt-8 flex items-center gap-3 text-sm text-muted-foreground">
						<ShieldCheck className="size-5 text-primary" />
						Dados protegidos com segurança e conformidade LGPD.
					</p>
				</div>
			</div>
		</section>
	);
}

function FeatureStrip() {
	return (
		<section
			id="recursos"
			className="border-y border-border bg-white">
			<div className="mx-auto grid max-w-376 gap-4 px-6 py-8 md:grid-cols-3 lg:px-8">
				{[
					['7 dias', 'para mapear sua operação e sair das planilhas soltas'],
					['1 fluxo', 'da busca por editais até a prestação de contas'],
					['LGPD', 'segurança e rastreabilidade para dados sensíveis'],
				].map(([value, label]) => (
					<div
						key={value}
						className="flex items-center gap-4">
						<p className="text-3xl font-bold text-primary">{value}</p>
						<p className="max-w-xs text-sm leading-6 text-muted-foreground">
							{label}
						</p>
					</div>
				))}
			</div>
		</section>
	);
}

function SolutionsSection() {
	return (
		<section
			id="solucoes"
			className="mx-auto max-w-376 scroll-mt-28 px-6 py-20 lg:px-8">
			<SectionHeader
				eyebrow="Soluções"
				title="Todo o ciclo da captação em uma operação só"
				description="O Proponente Digital organiza problemas reais de quem capta recursos: encontrar oportunidades, priorizar projetos, cumprir prazos e comprovar execução."
				center
			/>
			<div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
				{solutions.map(item => (
					<IconCard
						key={item.id}
						{...item}
					/>
				))}
			</div>
		</section>
	);
}

function ResourcesSection() {
	return (
		<section className="bg-white">
			<div className="mx-auto max-w-376 px-6 py-20 lg:px-8">
				<SectionHeader
					eyebrow="Funcionalidades"
					title="Tudo que sua organização precisa para captar e transformar"
					description="Funcionalidades pensadas para rotina operacional, não para uma apresentação bonita que ninguém consegue manter atualizada."
					center
				/>
				<div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
					{resources.map(item => (
						<IconCard
							key={item.id}
							{...item}
						/>
					))}
				</div>
			</div>
		</section>
	);
}

function WorkflowSection() {
	const steps = [
		[
			'Mapear',
			'Cadastre áreas de atuação, territórios, fontes e tipos de edital.',
		],
		[
			'Priorizar',
			'Compare valor, aderência, prazo, risco e capacidade de entrega.',
		],
		['Executar', 'Acompanhe responsáveis, anexos, cronograma e evidências.'],
		[
			'Comprovar',
			'Monte relatórios e prestação de contas com histórico rastreável.',
		],
	];

	return (
		<section className="mx-auto grid max-w-376 gap-10 px-6 py-20 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
			<div>
				<SectionHeader
					eyebrow="Operação"
					title="Menos improviso entre uma oportunidade e outra"
					description="O sistema cria uma memória operacional para sua equipe. Quando alguém entra no projeto, entende o contexto, o prazo e o próximo passo."
				/>
				<a
					href="#demonstracao"
					className="mt-8 inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground">
					Ver fluxo em uma demonstração
					<ArrowRight className="size-4" />
				</a>
			</div>
			<div className="grid gap-4 md:grid-cols-2">
				{steps.map(([title, description], index) => (
					<div
						key={title}
						className="rounded-lg border border-border bg-card p-6">
						<div className="flex size-10 items-center justify-center rounded-md bg-primary text-sm font-bold text-primary-foreground">
							{index + 1}
						</div>
						<h3 className="mt-5 text-lg font-semibold">{title}</h3>
						<p className="mt-3 text-sm leading-6 text-muted-foreground">
							{description}
						</p>
					</div>
				))}
			</div>
		</section>
	);
}

function AudienceSection() {
	return (
		<section
			id="para-quem"
			className="bg-white">
			<div className="mx-auto max-w-376 scroll-mt-28 px-6 py-20 lg:px-8">
				<SectionHeader
					eyebrow="Para quem é"
					title="Feito para quem precisa prestar contas do resultado"
					description="O Proponente Digital fala com equipes que vivem entre oportunidade, execução e responsabilidade pública ou institucional."
					center
				/>
				<div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
					{audiences.map(item => (
						<IconCard
							key={item.id}
							{...item}
						/>
					))}
				</div>
			</div>
		</section>
	);
}

function DemoSection() {
	return (
		<section
			id="demonstracao"
			className="mx-auto max-w-376 scroll-mt-28 px-6 py-20 lg:px-8">
			<div className="grid gap-8 rounded-lg bg-primary p-8 text-primary-foreground md:grid-cols-[1fr_auto] md:items-center lg:p-12">
				<div>
					<p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-foreground/80">
						Demonstração
					</p>
					<h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-normal md:text-4xl">
						Veja como o Proponente Digital organiza sua captação antes do próximo edital.
					</h2>
					<p className="mt-4 max-w-2xl text-sm leading-6 text-primary-foreground/80">
						Conte sobre sua operação e receba uma demonstração guiada com os
						fluxos mais importantes para sua equipe.
					</p>
				</div>
				<div className="flex flex-wrap gap-3 md:justify-end">
					<Link
						to="/entrar"
						className="inline-flex h-12 items-center justify-center rounded-md border border-primary-foreground/40 px-6 text-sm font-semibold text-primary-foreground">
						Entrar
					</Link>
					<a
						href="mailto:contato@proponentedigital.com.br?subject=Demonstra%C3%A7%C3%A3o%20Proponente%20Digital"
						className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-white px-6 text-sm font-semibold text-primary">
						Solicitar demonstração
						<ArrowRight className="size-4" />
					</a>
				</div>
			</div>
		</section>
	);
}

function SectionHeader({
	eyebrow,
	title,
	description,
	center = false,
}: {
	eyebrow: string;
	title: string;
	description: string;
	center?: boolean;
}) {
	return (
		<div className={center ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl'}>
			<p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
				{eyebrow}
			</p>
			<h2 className="mt-3 text-3xl font-bold tracking-normal text-foreground md:text-4xl">
				{title}
			</h2>
			<p className="mt-4 text-base leading-7 text-muted-foreground">
				{description}
			</p>
		</div>
	);
}

function IconCard({
	id,
	title,
	description,
	icon: Icon,
}: {
	id: string;
	title: string;
	description: string;
	icon: React.ComponentType<{ className?: string }>;
}) {
	return (
		<article
			id={id}
			className="scroll-mt-28 rounded-lg border border-border bg-card p-6 text-card-foreground transition hover:border-primary/50 hover:shadow-lg hover:shadow-slate-200/80">
			<div className="flex size-12 items-center justify-center rounded-md bg-primary text-primary-foreground">
				<Icon className="size-6" />
			</div>
			<h3 className="mt-5 text-lg font-semibold">{title}</h3>
			<p className="mt-3 text-sm leading-6 text-muted-foreground">
				{description}
			</p>
		</article>
	);
}
