<script lang="ts">
	import { onMount } from 'svelte';

	const techBadges = ['BLE AoA', 'UWB ToF', 'UWB TDOA', 'UWB AoA', '融合定位工卡', 'LPWAN / LoRa'];

	const coreTechs = [
		{
			title: 'BLE AoA',
			subtitle: '蓝牙角度到达定位',
			desc: '基于蓝牙 5.1+ 到达角技术，提供高性价比的室内定位方案，适用于智能供应链、人员定位与资产追踪。',
			points: ['实时角度定位', '兼容主流蓝牙生态', '部署灵活、成本友好'],
			color: 'cyan'
		},
		{
			title: 'UWB',
			subtitle: '超宽带 ToF / TDOA / AoA',
			desc: '利用超宽带高精度时差与角度定位能力，实现厘米级室内定位与实时空间感知，适用于工业自动化与安全监控。',
			points: ['厘米级高精度定位', '强抗干扰、实时响应', '支持 ToF / TDOA / AoA'],
			color: 'violet'
		},
		{
			title: '融合定位工卡',
			subtitle: '室内外连续定位终端',
			desc: '一张工卡集成 4G / LPWAN / LoRa 通信、GPS+北斗+RTK 室外定位与 UWB / BLE AoA 室内定位。',
			points: ['4G Cat.1 / LPWAN / LoRa', 'GPS + 北斗 + RTK', 'UWB + BLE AoA 室内定位'],
			color: 'emerald'
		},
		{
			title: 'LPWAN / LoRa',
			subtitle: '低功耗广域网',
			desc: '覆盖广、功耗低的物联网连接服务，适合远距离传感、环境监测、智慧城市与物流追踪场景。',
			points: ['长距离稳定连接', '低功耗终端与网关', '适配多种传感场景'],
			color: 'amber'
		}
	];

	const uwbProducts = [
		{
			name: 'UWB 锚点（下行）',
			img: '/images/uwb-anchor.webp',
			power: 'DC / 电池供电（40Ah 可工作 5 年）',
			accuracy: [['ToF', '20cm'], ['TDOA', '50cm'], ['AoA', '1m']],
			capacity: [['ToF', '25 个'], ['TDOA', '无限个'], ['AoA', '100 个']],
			features: null,
			delivery: '整机 / PCB 板 · 可定制'
		},
		{
			name: 'UWB 基站（上行）',
			img: '/images/uwb-locator.webp',
			power: 'DC / PoE 供电 · Ethernet / WiFi / 4G',
			accuracy: [['ToF', '20cm'], ['TDOA', '50cm'], ['AoA', '1m']],
			capacity: [['ToF', '25 个'], ['TDOA', '2000 个'], ['AoA', '100 个']],
			features: null,
			delivery: '整机 / PCB 板 · 可定制'
		},
		{
			name: 'UWB 标签',
			img: '/images/uwb-tag.webp',
			power: '电池供电 · 低功耗设计',
			accuracy: null,
			capacity: null,
			features: ['低功耗设计', '长续航电池', '适配 ToF / TDOA / AoA 模式', '人员 / 资产定位'],
			delivery: '整机 / PCB 板 · 可定制'
		}
	];

	const bleProducts = [
		{
			name: 'BLE AoA 定位基站 · 大型',
			img: '/images/ble_locator_large.webp',
			desc: '定位距离 50 米，DC + PoE 供电，支持 Ethernet / WiFi / 4G。',
			features: ['定位距离 50 米', 'DC + PoE 供电', 'Ethernet / WiFi / 4G', '整机 / PCB 板 · 可定制']
		},
		{
			name: 'BLE AoA 定位基站 · 中型',
			img: '/images/ble_locator_medium.webp',
			desc: '定位距离 35 米，DC + PoE 供电，支持 Ethernet / WiFi / 4G。',
			features: ['定位距离 35 米', 'DC + PoE 供电', 'Ethernet / WiFi / 4G', '整机 / PCB 板 · 可定制']
		},
		{
			name: 'BLE AoA 定位基站 · 小型',
			img: '/images/ble_locator_small.webp',
			desc: '定位距离 10 米，DC + PoE 供电，支持 Ethernet / WiFi / 4G。',
			features: ['定位距离 10 米', 'DC + PoE 供电', 'Ethernet / WiFi / 4G', '整机 / PCB 板 · 可定制']
		},
		{
			name: 'BLE AoA 标签',
			img: '/images/uwb-tag.webp',
			desc: '电池供电的低功耗定位标签，提供整机或 PCB 板，支持定制。',
			features: ['电池供电', '低功耗设计', '整机 / PCB 板', '可定制']
		}
	];

	const softwareProducts = [
		{
			name: '融合定位系统',
			img: 'https://rtls.zerobit.cc/raiz5jee8eiph0eeFooV/api/v1/projects/8442102/resources/697994/image-preview?onlineShareType=apidoc&locale=zh-CN',
			desc: 'UWB 系列部署与结算引擎，支持接入其它定位技术结果，提供区域围栏、历史数据、报警系统与数据可视化。',
			features: ['UWB 部署 / 结算引擎', '区域 / 围栏 / 约束', '历史数据与报警系统', 'HTTP / MQTT 接口', '数据可视化', '可定制'],
			url: 'https://rtls.zerobit.cc'
		},
		{
			name: 'BLE 部署工具',
			img: 'https://api.apifox.com/api/v1/projects/8214288/resources/656120/image-preview',
			desc: '面向 BLE AoA 定位系统的基站布点、坐标配置与部署校准工具。',
			features: ['基站布点', '坐标配置', '部署校准'],
			url: 'https://baseplot.zerobit.cc'
		},
		{
			name: 'BLE 结算引擎',
			img: 'https://api.apifox.com/api/v1/projects/8175002/resources/658367/image-preview',
			desc: 'BLE AoA 角度计算与定位结算引擎，为定位系统提供核心算法能力。',
			features: ['AoA 角度计算', '定位结算引擎'],
			url: 'https://ape.zerobit.cc'
		}
	];

	const customers = [
		{
			no: '01',
			name: '化工、能源、工业园区集成商',
			priority: '第一优先级',
			types: '智慧工厂集成商、化工园区数字化服务商、安全生产系统集成商、工业物联网工程商',
			needs: '人员定位、电子围栏、越界和滞留报警；复杂钢结构、多层管廊、厂房内外连续定位；工卡、基站、定位平台整套交付；定制定位硬件或集成到已有系统。',
			entry: 'UWB 锚点、基站、融合定位工卡、RTLS 软件平台',
			img: '/images/customer-1.webp'
		},
		{
			no: '02',
			name: '智慧仓储、物流和工厂自动化集成商',
			priority: '核心场景',
			types: 'WMS / WCS / MES 厂商、AGV / AMR 集成商、智能仓储工程商、制造业数字化服务商',
			needs: '人员、车辆、物料、工具的实时位置；叉车与人员接近预警、工位到达判断；物料流转、区域停留和生产过程追踪；与现有 MES、WMS、调度系统对接。',
			entry: 'UWB ToF / TDOA、UWB 信标、BLE AoA、定位引擎及 MQTT / HTTP 接口',
			img: '/images/customer-2.webp'
		},
		{
			no: '03',
			name: '定位模组、方案与 OEM / ODM 设备厂商',
			priority: '持续订单',
			types: '工卡厂商、工业手持终端厂商、资产追踪设备厂商、无线模块厂商、智能硬件品牌商',
			needs: '将 UWB / BLE AoA 集成进自己的设备；定制 PCB、天线、固件、协议及功耗设计；获得定位算法、参考设计和 SDK；以自有品牌出货。',
			entry: 'UWB / BLE 定位 PCB、UWB 信标、融合定位工卡、定位算法和定制开发',
			img: '/images/customer-3.webp'
		},
		{
			no: '04',
			name: 'BLE AoA 定位系统厂商与行业方案商',
			priority: '软硬组合',
			types: '蓝牙定位平台厂商、人员资产管理软件厂商、养老及医院物联网方案商、定位硬件品牌商',
			needs: 'BLE AoA 基站和标签；基站布点、坐标配置、部署校准工具；AoA 角度计算、定位结算引擎；以 OEM 方式补充自有产品线。',
			entry: 'BLE AoA 基站、标签、BasePlot 部署工具、APE 结算引擎',
			img: '/images/customer-4.webp'
		},
		{
			no: '05',
			name: '专用工卡、巡检和室内外融合定位方案商',
			priority: '差异化方向',
			types: '工业安全终端厂商、巡检系统厂商、应急管理方案商、需要室内外连续定位的行业软件公司',
			needs: '室外 GPS / 北斗 / RTK 定位；室内 UWB / BLE 定位；4G Cat.1、LPWAN 或 LoRa 通信；一张工卡完成定位、通信、报警和状态上报。',
			entry: '融合定位工卡、定位平台、硬件定制',
			img: '/images/customer-5.webp'
		}
	];

	// 联系我们
	const contacts = [
		{ initial: '廖', name: '廖经理', phone: '134 8089 3703', tel: 'tel:13480893703', action: '方案咨询' },
		{ initial: '陈', name: '陈经理', phone: '178 5847 8080', tel: 'tel:17858478080', action: '商务合作' },
		{ initial: '黄', name: '黄经理', phone: '181 2980 2506', tel: 'tel:18129802506', action: '商务合作' }
	];

	const colorMap: Record<string, { text: string; border: string; glow: string; dot: string }> = {
		cyan: { text: 'text-cyan-300', border: 'border-cyan-500/30', glow: 'shadow-cyan-500/10', dot: 'bg-cyan-400' },
		violet: { text: 'text-violet-300', border: 'border-violet-500/30', glow: 'shadow-violet-500/10', dot: 'bg-violet-400' },
		emerald: { text: 'text-emerald-300', border: 'border-emerald-500/30', glow: 'shadow-emerald-500/10', dot: 'bg-emerald-400' },
		amber: { text: 'text-amber-300', border: 'border-amber-500/30', glow: 'shadow-amber-500/10', dot: 'bg-amber-400' }
	};

	// 导航 scroll spy：根据滚动位置高亮当前所在板块
	let activeSection = $state('');
	const spySections = ['tech', 'products', 'customers', 'contact'];

	function handleScroll() {
		let current = '';
		for (const id of spySections) {
			const el = document.getElementById(id);
			if (el && el.getBoundingClientRect().top <= 140) {
				current = id;
			}
		}
		// 滚动到底部时高亮最后一项
		if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
			current = spySections[spySections.length - 1];
		}
		activeSection = current;
	}

	onMount(handleScroll);
</script>

<svelte:window onscroll={handleScroll} />

<main class="min-h-screen bg-slate-950 text-slate-100">
	<!-- 背景装饰 -->
	<div class="pointer-events-none fixed inset-0 overflow-hidden">
		<div class="absolute -top-40 left-1/2 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[140px]"></div>
		<div class="absolute top-1/3 -right-40 h-[500px] w-[500px] rounded-full bg-cyan-500/5 blur-[120px]"></div>
	</div>

	<!-- 导航栏 -->
	<nav class="fixed top-0 z-50 w-full border-b border-slate-800/60 bg-slate-950/70 backdrop-blur-xl">
		<div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
			<a href="#top" class="flex items-center gap-2">
				<img src="/icon.svg" alt="ZEROBIT" class="h-7 w-7" />
				<span class="text-lg font-bold tracking-tight">
					<span class="text-blue-400">零位</span>科技
				</span>
				<span class="hidden text-xs tracking-[0.2em] text-slate-500 sm:inline">ZEROBIT</span>
			</a>
			<div class="hidden items-center gap-8 text-sm md:flex">
				<a
					href="#tech"
					class="transition-colors {activeSection === 'tech'
						? 'font-medium text-blue-400'
						: 'text-slate-300 hover:text-blue-400'}"
				>
					核心技术
				</a>
				<a
					href="#products"
					class="transition-colors {activeSection === 'products'
						? 'font-medium text-blue-400'
						: 'text-slate-300 hover:text-blue-400'}"
				>
					产品中心
				</a>
				<a
					href="#customers"
					class="transition-colors {activeSection === 'customers'
						? 'font-medium text-blue-400'
						: 'text-slate-300 hover:text-blue-400'}"
				>
					客户方案
				</a>
				<a
					href="#contact"
					class="transition-colors {activeSection === 'contact'
						? 'font-medium text-blue-400'
						: 'text-slate-300 hover:text-blue-400'}"
				>
					联系我们
				</a>
			</div>
		</div>
	</nav>

	<!-- Hero -->
	<section id="top" class="relative px-6 pt-36 pb-20 sm:pt-44">
		<div class="mx-auto max-w-7xl text-center">
			<p class="text-xs uppercase tracking-[0.4em] text-blue-400">深圳零位科技有限公司</p>
			<h1 class="mt-6 text-5xl font-bold tracking-tight sm:text-7xl lg:text-8xl">
				<span class="bg-gradient-to-r from-blue-300 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
					零位科技
				</span>
			</h1>
			<p class="mt-3 text-xl font-light tracking-[0.35em] text-slate-500">ZEROBIT</p>
			<p class="mx-auto mt-10 max-w-2xl text-lg leading-relaxed text-slate-300 sm:text-xl">
				主攻物联定位技术，提供从 UWB、BLE AoA 到融合定位工卡与 LPWAN/LoRa
				的全栈定位解决方案。
			</p>

			<!-- 技术标签 -->
			<div class="mt-12 flex flex-wrap justify-center gap-3">
				{#each techBadges as badge}
					<span
						class="rounded-full border border-slate-700/80 bg-slate-900/60 px-4 py-2 text-sm text-slate-300 backdrop-blur transition-colors hover:border-blue-500/50 hover:text-blue-300"
					>
						{badge}
					</span>
				{/each}
			</div>
		</div>
	</section>

	<!-- 核心技术 -->
	<section id="tech" class="relative px-6 py-20">
		<div class="mx-auto max-w-7xl">
			<div class="mb-12 text-center">
				<p class="text-sm uppercase tracking-[0.35em] text-blue-400">Core Technologies</p>
				<h2 class="mt-3 text-3xl font-bold text-white sm:text-4xl">核心技术</h2>
			</div>

			<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
				{#each coreTechs as tech}
					{@const c = colorMap[tech.color]}
					<article
						class="group rounded-2xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur transition-all hover:-translate-y-1 hover:border-slate-700 {c.border} hover:shadow-xl {c.glow}"
					>
						<div class="flex items-center gap-2">
							<span class="h-2 w-2 rounded-full {c.dot}"></span>
							<p class="text-sm font-semibold uppercase tracking-[0.2em] {c.text}">{tech.title}</p>
						</div>
						<h3 class="mt-3 text-xl font-semibold text-white">{tech.subtitle}</h3>
						<p class="mt-3 text-sm leading-7 text-slate-400">{tech.desc}</p>
						<ul class="mt-5 space-y-2 text-sm text-slate-300">
							{#each tech.points as p}
								<li class="flex items-start gap-2">
									<span class="mt-2 h-1 w-1 flex-shrink-0 rounded-full {c.dot}"></span>
									{p}
								</li>
							{/each}
						</ul>
					</article>
				{/each}
			</div>
		</div>
	</section>

	<!-- 产品中心 -->
	<section id="products" class="relative px-6 py-20">
		<div class="mx-auto max-w-7xl">
			<div class="mb-12 text-center">
				<p class="text-sm uppercase tracking-[0.35em] text-blue-400">Products</p>
				<h2 class="mt-3 text-3xl font-bold text-white sm:text-4xl">产品中心</h2>
			</div>

			<!-- UWB 系列 -->
			<div class="mb-16">
				<div class="mb-6 flex items-center gap-3">
					<span class="h-6 w-1 rounded-full bg-violet-400"></span>
					<h3 class="text-2xl font-bold text-white">UWB 系列</h3>
					<span class="text-sm text-slate-500">ToF · TDOA · AoA</span>
				</div>
				<div class="grid gap-6 lg:grid-cols-3">
					{#each uwbProducts as product}
						<article class="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur">
							<!-- 产品图片 -->
							<div class="mb-5 flex items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/10 to-slate-900/40">
								<img src={product.img} alt={product.name} class="h-full w-full object-contain p-2 rounded-2xl" />
							</div>
							<h4 class="text-lg font-semibold text-white">{product.name}</h4>
							<p class="mt-2 text-sm text-slate-400">{product.power}</p>

							{#if product.accuracy}
								<div class="mt-5">
									<p class="mb-2 text-xs uppercase tracking-wider text-slate-500">精度</p>
									<div class="grid grid-cols-3 gap-2">
										{#each product.accuracy as [k, v]}
											<div class="rounded-lg bg-slate-800/60 px-3 py-2 text-center">
												<p class="text-xs text-slate-500">{k}</p>
												<p class="text-sm font-semibold text-violet-300">{v}</p>
											</div>
										{/each}
									</div>
								</div>
							{/if}

							{#if product.capacity}
								<div class="mt-4">
									<p class="mb-2 text-xs uppercase tracking-wider text-slate-500">容量</p>
									<div class="grid grid-cols-3 gap-2">
										{#each product.capacity as [k, v]}
											<div class="rounded-lg bg-slate-800/60 px-3 py-2 text-center">
												<p class="text-xs text-slate-500">{k}</p>
												<p class="text-sm font-semibold text-cyan-300">{v}</p>
											</div>
										{/each}
									</div>
								</div>
							{/if}

							{#if product.features}
								<div class="mt-4">
									<p class="mb-2 text-xs uppercase tracking-wider text-slate-500">特性</p>
									<div class="flex flex-wrap gap-2">
										{#each product.features as f}
											<span class="rounded-full border border-slate-700 bg-slate-800/50 px-3 py-1 text-xs text-slate-300">
												{f}
											</span>
										{/each}
									</div>
								</div>
							{/if}

							<div class="mt-auto pt-5">
								<span class="inline-block rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-400">
									{product.delivery}
								</span>
							</div>
						</article>
					{/each}
				</div>
			</div>

			<!-- BLE AoA 系列 -->
			<div class="mb-16">
				<div class="mb-6 flex items-center gap-3">
					<span class="h-6 w-1 rounded-full bg-cyan-400"></span>
					<h3 class="text-2xl font-bold text-white">BLE AoA 系列</h3>
				</div>
				<div class="grid gap-6 lg:grid-cols-4">
					{#each bleProducts as product}
						<article class="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur">
							<!-- 产品图片 -->
							<div class="mb-5 flex items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/10 to-slate-900/40">
								<img src={product.img} alt={product.name} class="h-full w-full object-contain p-2 rounded-2xl" />
							</div>
							<h4 class="text-lg font-semibold text-white">{product.name}</h4>
							<p class="mt-2 text-sm leading-7 text-slate-400">{product.desc}</p>
							<div class="mt-4 flex flex-wrap gap-2">
								{#each product.features as f}
									<span class="rounded-full border border-slate-700 bg-slate-800/50 px-3 py-1 text-xs text-slate-300">
										{f}
									</span>
								{/each}
							</div>
						</article>
					{/each}
				</div>
			</div>

			<!-- 融合定位工卡 -->
			<div class="mb-16">
				<div class="mb-6 flex items-center gap-3">
					<span class="h-6 w-1 rounded-full bg-emerald-400"></span>
					<h3 class="text-2xl font-bold text-white">融合定位工卡</h3>
				</div>
				<article class="overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900/80 to-slate-900/30 backdrop-blur">
					<div class="grid lg:grid-cols-3">
						<!-- 产品图片占位 -->
						<div class="flex items-center justify-center border-b border-slate-800 bg-gradient-to-br from-emerald-500/5 to-slate-900/40 p-12 lg:border-b-0 lg:border-r">
							<div class="my-5 flex items-center justify-center rounded-xl bg-gradient-to-br from-amber-500/10 to-slate-900/40">
								<img src="/images/card.webp" alt="融合定位工卡" class="h-full w-full object-contain p-2 rounded-2xl" />
							</div>
						</div>
						<div class="p-8 lg:col-span-2">
							<p class="text-slate-300 leading-8">
								一张工卡集成多模通信与室内外连续定位能力，满足工业安全、巡检与应急管理等场景需求。
							</p>
							<div class="mt-6 grid gap-4 sm:grid-cols-2">
								{#each [
									['通信', '4G Cat.1 / LPWAN / LoRa'],
									['室外定位', 'GPS + 北斗 + RTK'],
									['室内定位', 'UWB ToF + TDOA + AoA'],
									['补充定位', 'BLE AoA']
								] as item}
									<div class="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
										<p class="text-xs uppercase tracking-wider text-emerald-300">{item[0]}</p>
										<p class="mt-2 text-sm text-slate-200">{item[1]}</p>
									</div>
								{/each}
							</div>
							<div class="mt-6">
								<span class="inline-block rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-400">
									提供整机 / PCB 板 · 可定制
								</span>
							</div>
						</div>
					</div>
				</article>
			</div>

			<!-- 软件产品 -->
			<div>
				<div class="mb-6 flex items-center gap-3">
					<span class="h-6 w-1 rounded-full bg-amber-400"></span>
					<h3 class="text-2xl font-bold text-white">软件产品</h3>
				</div>
				<div class="grid gap-6 lg:grid-cols-3">
					{#each softwareProducts as product}
						<article class="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur">
							<h4 class="text-lg font-semibold text-white">{product.name}</h4>
							<!-- 产品图片 -->
							<div class="my-5 flex items-center justify-center rounded-xl bg-gradient-to-br from-amber-500/10 to-slate-900/40">
								<img src={product.img} alt={product.name} class="h-full w-full object-contain p-2 rounded-2xl" />
							</div>
							<p class="mt-2 text-sm leading-7 text-slate-400">{product.desc}</p>
							<div class="mt-4 flex flex-wrap gap-2">
								{#each product.features as f}
									<span class="rounded-full border border-slate-700 bg-slate-800/50 px-3 py-1 text-xs text-slate-300">
										{f}
									</span>
								{/each}
							</div>
							<div class="mt-auto pt-5">
								<a
									href={product.url}
									target="_blank"
									rel="noopener noreferrer"
									class="inline-flex items-center gap-1 text-sm text-blue-400 transition-colors hover:text-blue-300"
								>
									访问产品
									<svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
										<path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
									</svg>
								</a>
							</div>
						</article>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<!-- 客户方案 -->
	<section id="customers" class="relative px-6 py-20">
		<div class="mx-auto max-w-7xl">
			<div class="mb-12 text-center">
				<p class="text-sm uppercase tracking-[0.35em] text-blue-400">Customers & Solutions</p>
				<h2 class="mt-3 text-3xl font-bold text-white sm:text-4xl">客户与方案</h2>
			</div>

			<div class="space-y-8">
				{#each customers as cust}
					<article class="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur transition-colors hover:border-slate-700">
						<div class="grid lg:grid-cols-5">
							<!-- 图片 -->
							<div class="relative h-56 lg:col-span-2 lg:h-64">
								<img
									src={cust.img}
									alt={cust.name}
									class="h-full w-full object-cover"
								/>
								<div class="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent lg:bg-gradient-to-r"></div>
								<div class="absolute bottom-4 left-4">
									<span class="text-4xl font-bold text-white/20">{cust.no}</span>
								</div>
							</div>

							<!-- 内容 -->
							<div class="p-6 lg:col-span-3 lg:h-64 lg:overflow-y-hidden lg:p-8">
								<div class="flex flex-wrap items-center gap-3">
									<h3 class="text-xl font-bold text-white">{cust.name}</h3>
								</div>
								<p class="mt-2 text-xs text-slate-500">{cust.types}</p>

								<div class="mt-4">
									<p class="text-xs uppercase tracking-wider text-slate-500">核心需求</p>
									<p class="mt-1 text-sm leading-7 text-slate-300">{cust.needs}</p>
								</div>

								<div class="mt-4">
									<p class="text-xs uppercase tracking-wider text-slate-500">切入产品</p>
									<p class="mt-1 text-sm leading-7 text-cyan-300">{cust.entry}</p>
								</div>
							</div>
						</div>
					</article>
				{/each}
			</div>
		</div>
	</section>

	<!-- 联系我们 -->
	<section id="contact" class="relative px-6 py-20">
		<div class="mx-auto max-w-7xl">
			<div class="mb-12 text-center">
				<p class="text-sm uppercase tracking-[0.35em] text-blue-400">Contact Us</p>
				<h2 class="mt-3 text-3xl font-bold text-white sm:text-4xl">联系我们</h2>
				<p class="mt-4 text-slate-400">欢迎咨询产品方案与商务合作</p>
			</div>

			<div class="grid gap-6 sm:grid-cols-3">
				{#each contacts as c}
					<article class="rounded-2xl border border-slate-800 bg-slate-900/50 p-8 text-center backdrop-blur transition-colors hover:border-blue-500/40">
						<div class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-500/10 text-xl font-semibold text-blue-300">
							{c.initial}
						</div>
						<h3 class="mt-4 text-lg font-semibold text-white">{c.name}</h3>
						<a
							href={c.tel}
							class="mt-3 block text-2xl font-semibold tracking-wide text-blue-300 transition-colors hover:text-blue-200"
						>
							{c.phone}
						</a>
						<p class="mt-2 flex items-center justify-center gap-1.5 text-xs text-slate-500">
							<svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
								<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
							</svg>
							点击拨打 · {c.action}
						</p>
					</article>
				{/each}
			</div>
		</div>
	</section>

	<!-- 页脚 -->
	<footer class="relative border-t border-slate-800 px-6 py-12">
		<div class="mx-auto max-w-7xl">
			<div class="flex flex-col items-center justify-between gap-6 sm:flex-row">
				<div class="flex items-center gap-2">
					<img src="/icon.svg" alt="ZEROBIT" class="h-6 w-6" />
					<span class="font-bold">
						<span class="text-blue-400">零位</span>科技
					</span>
					<span class="text-xs tracking-[0.2em] text-slate-500">ZEROBIT</span>
				</div>
				<div class="flex flex-wrap justify-center gap-6 text-sm text-slate-400">
					<a href="#tech" class="hover:text-blue-400">核心技术</a>
					<a href="#products" class="hover:text-blue-400">产品中心</a>
					<a href="#customers" class="hover:text-blue-400">客户方案</a>
					<a href="#contact" class="hover:text-blue-400">联系我们</a>
				</div>
			</div>
			<div class="mt-8 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
				<p>© 2026 深圳零位科技有限公司 保留所有权利</p>
			</div>
		</div>
	</footer>
</main>
