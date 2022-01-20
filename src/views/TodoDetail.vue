<template>
	<div>
		<div>
			{{todoDetail.title}}
			{{todoDetail.date}}
		</div>
		<div>
			<p v-html="todoDetail.content"></p>
		</div>
	</div>
</template>

<script>
export default {
	name: 'TodoDetail',
	data() {
		return {
			todoDetail: null,
		}
	},
	computed() {

	},
	created() {
		this.requestTodoDetail();
	},
	methods: {
		async requestTodoDetail() {
			try {
				const response = await this.$store.dispatch("requestMethods", {
					method: 'GET',
					url: `http://localhost:3001/todolist/${this.$route.params.id}`,
				});

				if (response.data) {
					response.data.content = this.changeEntity(response.data.content);
					this.todoDetail = response.data;
				}
			}
			catch(ex) {
				console.error('error', ex);
			}
		},
		changeEntity(txt) {
			return txt
				.replace(/\n/g, '<br>')
				.replace(/&amp;/g, '&')
				.replace(/&lt;/g, '<')
				.replace(/&gt;/g, '>')
				.replace(/&quot;/g, '"')
				.replace(/&#039;/g, "'")
				.replace(/&#39;/g, "'");
		}
	}
}
</script>

<style>

</style>