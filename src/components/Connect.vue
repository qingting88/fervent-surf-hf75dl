<template>
    <button class="btn btn-primary" @click="onConnect">
        <span class="loading loading-spinner" v-if="loading"></span>
        Connect
    </button>
</template>
<script lang="tsx" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getSignFromExchange } from '../server'
import { legend } from '../legend'

const router=useRouter();

const loading = ref(false)



const onConnect = async () => {

    loading.value = true;
    const { data } = await getSignFromExchange();
    const resp2 = await legend.authorize({
        timestamp: data.timestamp,
        signature: data.signature,
        appId: data.appId,
        appKey: data.appKey,
        appUid: data.appUid,
        appUrl: data.appUrl,
        appEmail: data.appEmail,
    });
    if (resp2.kyc_status == "Approved") {
        router.push('/trade');
    } else {
        alert("KYC not approved");
    }
    loading.value = false;
}
</script>