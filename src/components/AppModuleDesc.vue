<template>
	<section class="module-desc">
		<h3 class="module-desc__heading">Инструменты операционного контроля Маркетплейса</h3>
		<p class="module-desc__text">
			В больших компаниях дашборды используются не только для анализа данных, но и для операционного
			контроля метрик и ежедневной работы. Расскажу о том, как устроен контроль метрик в Яндекс Go и
			с помощью каких инструментов мы это делаем.
			<br /><br />
			А ещё система отчётности внутри компании тоже своего рода маркетплейс — аналитики создают
			дашборды, а бизнес-пользователи используют их для принятия решений. Поэтому мы применяем
			продуктовые подходы к управлению BI-системой, верим, что качественная отчётность является
			реальным конкурентным преимуществом и строго следим за её качеством. Чтобы делать это проще и
			эффективнее мы ввели новую должность в компании и развили комьюнити BI-аналитиков. Расскажу
			что из этого получилось и как помогло нам в текущей ситуации.
		</p>
		<ul class="module-desc__tags-list">
			<li class="module-desc__tag">Маркетинг</li>
			<li class="module-desc__tag">Анализ данных</li>
			<li class="module-desc__tag">Маркетплейсы</li>
		</ul>
	</section>
</template>

<script setup></script>

<style>
.module-desc {
	padding: 0;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
}

.module-desc__heading {
	margin: 0;

	font-family: var(--headings-font);
	font-weight: 700;
	font-style: normal;
	font-size: 24px;
	line-height: 28px;
	color: var(--headings-color);
	text-transform: uppercase;
}

.module-desc__text {
	margin: 16px 0 0;
	padding: 0;

	font-family: var(--text-font);
	font-weight: 400;
	font-style: normal;
	font-size: 16px;
	line-height: 24px;
	color: var(--text-secondary-color);
}

.module-desc__tags-list {
	margin: 30px 0 0;
	padding: 0;
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
	align-items: center;
	gap: 12px;

	list-style: none;
}

.module-desc__tag {
	box-sizing: border-box;
	margin: 0;
	padding: 6px 10px;

	font-family: var(--text-font);
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	line-height: 16px;
	color: rgba(0, 0, 0, 0.5);

	border-radius: 12px;
	background: #f8f8f8;
}
</style>
