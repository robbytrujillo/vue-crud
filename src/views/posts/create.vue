<script setup>
    // import ref
    import { ref } from "vue";

    // import router
    import { useRouter } from "vue-router";

    // import api
    import Api from "../../api";

    // init router
    const router = useRouter();

    // define state
    const image = ref("");
    const title = ref("");
    const content = ref("");
    const errors = ref([]);

    // method for handle file changes
    const handleFileChange = (e) => {
        // assign file to state
        image.value = e.target.files[0];
    };

    // method "storePost"
    const storePost = async () => {

        // init formData
        let formData = new FormData();

        // assign state value to formData
        formData.append("image", image.value);
        formData.append("title", title.value);
        formData.append("content", content.value);

        // store data with API
        await api.post('/api/posts', formData)
            .then(() => {
            // redirect 
            router.push({ name: "/posts" });
            })

            .catch((error) => {
                // assign response error data to state "errors"
                errors.value = error.response.data;
            });
    };
</script>

<template>
    <div class="container mt-5 mb-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <form @submit.prevent="storePost()">
                            <div class="mb-3">
                                <label class="form-label fw-bold">Image</label>
                                <input type="file" class="form-control" @change="handleFileChange($event)">
                                <div v-if="errors.image" class="alert alert-danger mt-2">
                                    <span>{{ errors.image[0] }}</span>
                                </div>
                            </div>
                        </form>
                        <!-- HALAMAN POST CREATE -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>