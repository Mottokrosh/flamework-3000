import { state } from '../store/store.js';

// let user = new store({ username: "Meepo" }, "user");

customElements.define("user-info", class extends HTMLElement {
	constructor() {
		super();

		this.attachShadow({ mode: "open" });

		this.shadowRoot.innerHTML = `
			<style>
				card {
					display: flex;
					flex-direction: column;
					align-items: center;
					background-color: hsl(0deg 0% 90%);
					border-radius: 4px;
					padding: 16px;
					width: max-content;
				}
				figure {
					margin: 0 0 16px 0;
					padding: 0;
					width: 48px;
					height: 48px;
					border-radius: 50%;
					background-color: rebeccapurple;
				}
			</style>
			<card></card>
		`;

		this.card = this.shadowRoot.querySelector("card");
	}

	connectedCallback() {
		// this.username = this.getAttribute("username") || "Incognito";
		this.username = state.username || "Not logged in";
		const instance = this;

		document.addEventListener("state", function (event) {
			instance.username = event.detail.username;
			instance.render();
		});

		this.render();

		setTimeout(function() {
			state.username = "Brandy";
		}, 4000);
	}

	render() {
		this.card.innerHTML = `
			<figure></figure>
			<username>${this.username}</username>
		`;
	}
});