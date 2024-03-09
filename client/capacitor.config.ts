import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
	appId: "com.menshub.app",
	appName: "MensHub",
	webDir: "build",
	bundledWebRuntime: false,
	server: {
		url: "http://192.168.1.147:3000",
		cleartext: true,
	},
};

export default config;
