<script lang="ts">
	import { enhance } from '$app/forms';

	export let form;

	// https://codepen.io/fghty/pen/PojKNEG
</script>

<div class="background">
	<div class="shape"></div>
	<div class="shape"></div>
</div>

<form method="post" use:enhance>
	<h2>Sign up</h2>
	<div>
		<label for="username">Username</label>
		<input value="forth" name="username" id="username" />
		{#if form?.message?.username}<span>{form.message.username._errors}</span>{/if}
	</div>

	<div>
		<label for="username">Email</label>
		<input value="forth@live.fr" name="email" id="email" />
		{#if form?.message?.email}<span>{form.message.email._errors}</span>{/if}
	</div>

	<div>
		<label for="password">Password</label>
		<input value="tototo" type="password" name="password" id="password" />
		{#if form?.message?.password}<span>{form.message.password._errors}</span>{/if}
	</div>

	{#if form?.message?._errors}
		<div>
			<span>{form.message._errors}</span>
		</div>
	{/if}

	<button>Sign up</button>

	<a href="/signin">Sign in</a>
</form>

<style lang="scss">
	.background {
		width: 430px;
		height: 520px;
		position: absolute;
		transform: translate(-50%, -50%);
		left: 50%;
		top: 50%;

		.shape {
			height: 200px;
			width: 200px;
			position: absolute;
			border-radius: 50%;

			&:first-child {
				background: linear-gradient(#1845ad, #23a2f6);
				left: -80px;
				top: -80px;
			}

			&:last-child {
				background: linear-gradient(to right, #ff512f, #f09819);
				right: -30px;
				bottom: -80px;
			}
		}
	}

	form {
		width: 400px;
		background-color: rgba(255, 255, 255, 0.13);
		position: absolute;
		transform: translate(-50%, -50%);
		top: 50%;
		left: 50%;
		border-radius: 10px;
		backdrop-filter: blur(10px);
		border: 2px solid rgba(255, 255, 255, 0.1);
		box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
		padding: 50px 35px;

		* {
			font-family: 'Poppins', sans-serif;
			color: #ffffff;
			letter-spacing: 0.5px;
			outline: none;
			border: none;
		}

		label {
			display: block;
			margin-top: 30px;
			font-size: 16px;
			font-weight: 500;
		}
		input {
			display: block;
			height: 50px;
			width: 100%;
			background-color: rgba(255, 255, 255, 0.07);
			border-radius: 3px;
			padding: 0 10px;
			margin-top: 8px;
			font-size: 14px;
			font-weight: 300;
			box-sizing: border-box;

			&:focus-visible {
				outline: 2px solid #ffffff;
			}
		}

		span {
			display: block;
			color: red;
			margin-top: 8px;
		}

		button {
			margin-top: 50px;
			width: 100%;
			background-color: #ffffff;
			color: #080710;
			padding: 15px 0;
			font-size: 18px;
			font-weight: 600;
			border-radius: 5px;
			cursor: pointer;

			&:hover {
				box-shadow: 0 0 8px 5px rgba(255, 255, 255, 0.47);
			}
		}
	}

	a {
		display: block;
		margin-top: 20px;
		width: 100%;
		background-color: rgba(255, 255, 255, 0.27);
		color: #080710;
		padding: 15px 0;
		font-size: 18px;
		font-weight: 600;
		border-radius: 3px;
		text-decoration: none;
		color: #eaf0fb;
		text-align: center;
		cursor: pointer;
		box-sizing: border-box;

		&:hover {
			background-color: rgba(255, 255, 255, 0.47);
		}
	}

	h2 {
		font-size: 32px;
		font-weight: 500;
		line-height: 42px;
		text-align: center;
	}
</style>
