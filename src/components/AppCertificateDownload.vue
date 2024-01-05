<template>
	<div class="certificate-download">
		<div class="certificate-download__text-wrapper">
			<strong class="certificate-download__topic">Пример электронного сертификата</strong>
			<p class="certificate-download__text">После прохождения курса вам будет доступен сертификат.</p>
		</div>
		<a
				class="certificate-download__button"
				href="https://mm-dev.doclub.tv/media/uploads/certificate/a4_-_1.png"
				target="_blank"
		>
			Посмотреть
		</a>
	</div>
</template>

<script setup></script>

<style>
.certificate-download {
	position: relative;
	box-sizing: border-box;
	padding: 24px 24px 24px 96px;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: flex-start;
	align-items: center;

	border-radius: 16px;
	background: var(--background-secondary);
}

.certificate-download::before {
	content: '';
	position: absolute;
	top: calc(50% - 28px);
	left: 24px;

	display: block;
	width: 56px;
	height: 56px;

	background: url('../assets/icons/icon-file.svg') center no-repeat;
}

.certificate-download__text-wrapper {
	margin: 0 10px 0 0;
	padding: 0;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	gap: 8px;
}

.certificate-download__topic {
	margin: 0;

	font-family: var(--text-font);
	font-weight: 600;
	font-style: normal;
	font-size: 16px;
	line-height: 20px;
	color: var(--headings-color);
}

.certificate-download__text {
	margin: 0;

	font-family: var(--text-font);
	font-weight: 400;
	font-style: normal;
	font-size: 14px;
	line-height: 16px;
	color: #4c4c4c;
}

.certificate-download__button {
	position: relative;
	box-sizing: border-box;
	margin: 0 0 0 auto;
	padding: 10px 56px 10px 20px;

	font-family: var(--text-font);
	font-weight: 400;
	font-style: normal;
	font-size: 16px;
	line-height: 20px;
	color: #fff;
	text-decoration: none;

	border-radius: 5px;
	background: var(--button-primary-default-color);
	cursor: pointer;
	transition: var(--base-transition);
}

.certificate-download__button:hover,
.certificate-download__button:focus {
	background: #a689e3;
}

.certificate-download__button::after {
	content: '';
	position: absolute;
	top: calc(50% - 12px);
	right: 20px;

	display: block;
	width: 24px;
	height: 24px;

	background: url('../assets/icons/icon-download.svg') center no-repeat;
}

@media screen and (max-width: 500px) {
	.certificate-download {
		padding: 96px 24px 24px;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
	}

	.certificate-download::before {
		top: 24px;
		left: 24px;
	}

	.certificate-download__button {
		margin-left: 0;
		margin-top: 16px;
	}
}
</style>
