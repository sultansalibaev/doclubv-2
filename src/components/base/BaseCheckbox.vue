
<template>
    <div class="filter-dropdown">
        <input
            v-model="model"
            :value="value"
            class="filter-dropdown__checkbox"
            type="checkbox"
        />
        <label
            class="filter-dropdown__label"
        >
            {{ label }}
        </label>
    </div>
</template>

<script setup >
import { computed } from 'vue';
const props = defineProps({
    modelValue: { type: [Array, Boolean] },
    value: { type: [Boolean, Object] },
    label: { type: String },
});
const emit = defineEmits(['update:modelValue']);
const model = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit("update:modelValue", value);
    },
});
</script>

<style scoped>
.filter-dropdown {
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}
.filter-dropdown__label {
    position: relative;
    margin: 0;
    padding: 0 0 0 36px;
    width: 100%;

    font-family: var(--text-font);
    font-weight: 400;
    font-style: normal;
    font-size: 16px;
    line-height: 24px;
    color: var(--text-secondary-color);
}

.filter-dropdown__label::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;

    box-sizing: border-box;
    display: block;
    width: 24px;
    height: 24px;

    border-radius: 8px;
    border: 1px solid var(--checkbox-unchecked-default-border-color);
    background: var(--checkbox-unchecked-default-bg-color);
    transition: var(--base-transition);
}

.filter-dropdown__checkbox {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10;
    height: 24px;
    opacity: 0;
    cursor: pointer;
}
.filter-dropdown__checkbox:disabled ~ .filter-dropdown__label {
    pointer-events: none;
}

.filter-dropdown__checkbox:disabled ~ .filter-dropdown__label::before {
    border-color: var(--checkbox-unchecked-disabled-border-color);
    background: var(--checkbox-unchecked-disabled-bg-color);
}

.filter-dropdown__checkbox:disabled ~ .filter-dropdown__label::after {
    border-color: var(--checkbox-checked-disabled-bg-color);
    background-color: var(--checkbox-checked-disabled-bg-color);
}

.filter-dropdown__label::after {
    content: none;
    position: absolute;
    top: 0;
    left: 0;

    box-sizing: border-box;
    display: block;
    width: 24px;
    height: 24px;

    border-radius: 8px;
    border: 1px solid var(--checkbox-checked-default-bg-color);
    background: url('@/assets/icons/icon-tick.svg') center no-repeat
    var(--checkbox-checked-default-bg-color);
}

.filter-dropdown__checkbox:checked ~ .filter-dropdown__label::after {
    content: '';
}
</style>
