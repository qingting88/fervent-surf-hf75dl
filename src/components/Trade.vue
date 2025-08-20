<template>
    <div role="tablist" class="tabs tabs-lifted">
        <input type="radio" name="my_tabs_2" role="tab" class="tab" aria-label="Buy" checked="checked" />
        <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">
            <Buy />
        </div>

        <input type="radio" name="my_tabs_2" role="tab" class="tab" aria-label="Sell" />
        <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">
            尚未开放
        </div>
    </div>
</template>
<script lang="tsx" setup>
import Buy from './Buy.vue'
</script>