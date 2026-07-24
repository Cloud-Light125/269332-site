export interface CatalogItem {
	name: string;
	englishName?: string;
	summary: string;
	repository: string;
	website?: string;
	websiteLabel?: string;
	repositoryLabel?: string;
	detailsPath?: string;
	downloadUrl?: string;
	downloadLabel?: string;
	downloadNote?: string;
	category: string;
	status: string;
	visibility: 'public' | 'private';
	tags: string[];
}

export const gameTools: CatalogItem[] = [
	{
		name: 'Steam 游玩时光全景图',
		summary:
			'根据一个或多个 Steam 账号的公开游戏时长生成封面全景图。游玩越久，游戏封面越醒目；相同游戏的时长可跨账号累计，并支持排行榜和 PNG 图片导出。',
		repository: 'https://github.com/yundan125/playtime-panorama',
		website: 'https://playtime.269332.xyz',
		websiteLabel: '立即使用',
		repositoryLabel: '查看源码',
		category: 'Steam / 数据可视化',
		status: '可用',
		visibility: 'public',
		tags: ['Steam', '游戏数据', '多账号累计', 'PNG 导出'],
	},
	{
		name: '守望先锋看图猜英雄',
		summary:
			'面向没玩过《守望先锋》的玩家制作的第一印象猜名游戏。根据英雄图标或全身照，从名称池中为每位英雄分配名字并填写理由，提交后再揭晓真实名称和猜测结果。',
		repository: 'https://github.com/yundan125/overwatch-hero-quiz',
		website: '/overwatch-hero-quiz/',
		category: '守望先锋 / 英雄猜名',
		status: '可用',
		visibility: 'public',
		tags: ['HTML', 'CSS', 'JavaScript', 'localStorage'],
	},
	{
		name: 'OWCS Predictor',
		summary:
			'面向 OWCS 2026 Midseason Championship 小组赛的浏览器对战预测器，支持选择胜者、录入比分、编辑赛事配置、导入导出和本地保存。',
		repository: 'https://github.com/yundan125/OWCS-Predictor',
		website: '/owcs-predictor/',
		websiteLabel: '立即使用',
		category: '电竞 / 预测工具',
		status: '可用',
		visibility: 'public',
		tags: ['HTML', 'CSS', 'JavaScript', 'localStorage'],
	},
];

export const projects: CatalogItem[] = [
	{
		name: 'Windows 高级电源设置管理器',
		englishName: 'PowerSettingsManager',
		summary:
			'扫描 Windows 10/11 中被隐藏的高级电源选项，并集中管理它们的显示、隐藏和恢复。修改前会保存快照和注册表备份。',
		repository: 'https://github.com/yundan125/PowerSettingsManager',
		detailsPath: '/projects/power-settings-manager/',
		downloadUrl: 'https://github.com/yundan125/PowerSettingsManager/releases/latest',
		downloadLabel: 'GitHub 下载',
		downloadNote: 'GitHub Releases 中提供 Windows x64 便携 ZIP，已包含运行所需组件。解压后即可运行。',
		category: 'Windows 系统工具',
		status: '可用',
		visibility: 'public',
		tags: ['.NET 8', 'WPF', 'PowerCfg', 'Windows 注册表'],
	},
	{
		name: 'Windows 移动热点控制器',
		englishName: 'MobileHotspotController',
		summary:
			'用于管理 Windows 11 移动热点。在设备支持时，也可以通过 Wi-Fi Direct 创建只供局域网连接的热点，并提供托盘控制和诊断信息。',
		repository: 'https://github.com/yundan125/MobileHotspotController',
		detailsPath: '/projects/mobile-hotspot-controller/',
		downloadUrl: 'https://github.com/yundan125/MobileHotspotController/releases/latest',
		downloadLabel: 'GitHub 下载',
		downloadNote: 'GitHub Releases 中提供 Windows 11 x64 单文件程序，无需另外安装 .NET 运行时。',
		category: 'Windows 网络工具',
		status: '可用',
		visibility: 'public',
		tags: ['.NET 8', 'WPF', 'WinRT', 'Wi-Fi Direct'],
	},
	{
		name: 'TwitchDropsMiner 掉宝自动领取开关补丁工具',
		englishName: 'TDM Claim Toggle Patcher',
		summary:
			'为 TwitchDropsMiner 增加可开关的自动领取掉宝功能。应用补丁前会检查源码兼容性，并保存可以恢复的备份。',
		repository: 'https://github.com/yundan125/tdm-claim-toggle-patcher',
		detailsPath: '/projects/tdm-claim-toggle-patcher/',
		downloadUrl: 'https://github.com/yundan125/tdm-claim-toggle-patcher/releases/latest',
		downloadLabel: 'GitHub 下载',
		downloadNote: 'GitHub Releases 中提供 Windows 单文件程序，图形界面和命令行均可使用。',
		category: '源码补丁工具',
		status: '可用',
		visibility: 'public',
		tags: ['Python', 'AST', 'GUI / CLI', 'TwitchDropsMiner'],
	},
];
