<template>
    <div class="container">
        <div class="row">
            <div class="col"></div>
            <div class="col-8">
                <div class="input-group pt-3 pb-2">
                    <span class="input-group-text" id="inputGroup-sizing-default">Enter city name:</span>
                    <input type="text" v-model="city" class="form-control" aria-label="Enter city name">
                </div>
                <router-link :to="'/forecast/' + city">
                    <button class="btn btn-secondary btn-sm">Get Forecast</button>
                </router-link>

            </div>
            <div class="col"></div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                city: '',
            }
        },
        methods: {
            getForecast: () => {

            }
        }
    }
</script>

<style scoped>

</style>