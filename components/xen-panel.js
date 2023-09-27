customElements.define('xen-panel', class extends HTMLElement {
	constructor() {
		super();

		this.attachShadow({ mode: "open" });

		const wrapper = document.createElement("div");
		const style = document.createElement("style");

		style.textContent = `
			:host {
				--color-blue: 200deg 98% 50%;
				--color-red: 15deg 98% 50%;
				display: block;
				margin-bottom: 16px;
			}

			figure, p { margin: 0; padding 0; }

			div {
				border-radius: 4px;
				padding: 12px 16px;
				border: 1px solid;
				display: flex;
			}

			div > * {
				padding-inline: 8px;
			}

			:host([type="info"]) div {
				background-color: hsl(var(--color-blue) / 0.2);
				border-color: hsl(var(--color-blue));
			}

			:host([type="error"]) div {
				background-color: hsl(var(--color-red) / 0.2);
				border-color: hsl(var(--color-red));
			}
		`;

		this.shadowRoot.append(style, wrapper);
		this.wrapper = wrapper;
		this.icons = {
			info: "⚠️",
			error: "🔴",
			default: "⚠️",
		};
	}

	render() {
		this.wrapper.innerHTML = `
			<figure>${this.icons[this.type || "default"]}</figure>
			<p><slot></slot></p>
		`;
	}

	connectedCallback() {
		this.type = this.getAttribute("type") || "info";

		this.render();
	}

	static get observedAttributes() {
		return ["type"];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue === newValue) return;

		if (name === "type") {
			this.type = newValue;
		}

		this.render();
	}
});