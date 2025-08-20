<template>
    <div>
        <div class="flex flex-col space-y-4 pt-10">
            <ul class="steps">
                <li class="step step-primary">Billing</li>
                <li class="step">Card</li>
            </ul>
            <label class="input w-full">
                date_of_birth
                <input type="text" class="grow" v-model="model.date_of_birth" />
            </label>
            <label class="select w-full">
                country
                <select v-model="model.country">
                    <option v-for="item in countries" :key="item.id">{{ item.name_en }}</option>
                </select>
            </label>
            <label class="select w-full">
                state
                <select v-model="model.state">
                    <option v-for="item in states" :key="item.id">{{ item.name_en }}</option>
                </select>
            </label>
            <label class="input w-full">
                city
                <input type="text" class="grow" v-model="model.city" />
            </label>
            <label class="input w-full">
                address_1
                <input type="text" class="grow" v-model="model.address_line_1" />
            </label>
            <label class="input w-full">
                address_2
                <input type="text" class="grow" v-model="model.address_line_2" />
            </label>
            <label class="input w-full">
                zipcode
                <input type="text" class="grow" v-model="model.zipcode" />
            </label>

            <div class=" flex justify-center items-center">
                <button class="btn btn-primary btn-wide" @click="onSubmit">
                    <span class="loading loading-spinner" v-if="loading"></span>
                    NEXT
                </button>
            </div>
        </div>
    </div>
</template>
<script lang="tsx" setup>
import { onMounted, ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { legend } from '../legend'
const router = useRouter();
const model = ref<LegendBaseTypes.BillingAddress>({
    name: '',
    date_of_birth: '',
    address_line_1: '',
    address_line_2: '',
    city: '',
    country: '',
    country_iso2_code: '',
    state: '',
    zipcode: '',
    registration_path: '',
});
const countries = ref<LegendBaseTypes.Region[]>([]);
const states = ref<LegendBaseTypes.Region[]>([]);
const loading = ref(false);


onMounted(async () => {
    model.value = await legend.getBillingAddress();
    const { data } = await legend.getRegions({ parent_id: 0 });
    countries.value = data;
})

watchEffect(async () => {
    if (model.value.country) {
        const country_id = countries.value.find(item => item.name_en == model.value.country)?.id;
        if (country_id) {
            states.value = (await legend.getRegions({ parent_id: country_id })).data;
        }
    }
})

const onSubmit = async () => {
    loading.value = true;
    const resp = await legend.setBillingAddress(model.value);
    console.log("🚀 ~ onSubmit ~ resp:", resp)
    if (resp.uuid) {
        router.push('/card/' + resp.uuid)
    }
    loading.value = false;
}
</script>