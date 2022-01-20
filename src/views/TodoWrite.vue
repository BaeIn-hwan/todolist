<template>
	<article class="todo todo-write">
		<form @submit.prevent="save">
			<fieldset>
				<legend>TODOLIST 등록</legend>

				<ul class="todo-write__table">
					<li class="todo-write__row">
						<strong class="todo-write__title">제목</strong>
						<div class="todo-write__content">
							<input type="text" class="todo-write__form--input" placeholder="제목을 입력해주세요." v-model="todoItem.title" @input="inputTitle($event)">
						</div>
					</li>

					<li class="todo-write__row">
						<strong class="todo-write__title">날짜</strong>
						<div class="todo-write__content">
							<input type="date" class="todo-write__form--input" v-model="todoItem.date">
						</div>
					</li>

					<li class="todo-write__row">
						<strong class="todo-write__title valign--top">내용</strong>
						<div class="todo-write__content">
							<textarea class="todo-write__form--textarea" placeholder="내용을 입력해주세요." v-model="todoItem.content" @input="inputContent($event)"></textarea>
						</div>
					</li>
				</ul>

				<div class="todo-write__btn--area">
					<button type="button" class="todo-common__btn todo-common__btn--black" @click="save($event)">등록</button>
					<button type="button" class="todo-common__btn todo-common__btn--white" @click="todoBack($event)">취소</button>
				</div>
			</fieldset>
		</form>
	</article>
</template>

<script>
export default {
	name: 'TodoWrite',
	data() {
		return {
			todoItem: {
				title: '',
				date: '',
				content: '',
				completed: false
			},
		}
	},
	created() {
		const queryString = this.$route.query.update;

		if (queryString) {
			this.requestTodoItem(queryString);
		}
	},
	methods: {
		inputTitle(e) {
			this.todoItem.title = e.target.value;
		},
		inputContent(e) {
			this.todoItem.content = e.target.value;
		},
		todoBack() {
				// this.$store.dispatch('alertOpen', {
				// 	isOpen: true,
				// 	message: '확인',
				// 	returnURL: '/TodoList'
				// });
			this.$router.push('/');
		},
		save() {
			if ( this.validationCheck() ) {
				this.todoSubmit();
			}
		},
		async requestTodoItem(idx) {
			try {
				const response = await this.$store.dispatch("requestMethods", {
					method: 'GET',
					url: `http://localhost:3001/todolist/${idx}`,
				});

				if (response.data) {
					delete(response.data.id);
					this.todoItem = response.data;
				}
			}
			catch(ex) {
				console.log('error', ex);
			}
		},
		async todoSubmit() {
			const queryString = this.$route.query.update;

			try {
				const response = await this.$store.dispatch("requestMethods", {
					method: queryString ? 'PATCH' : 'POST',
					url: queryString ? `http://localhost:3001/todolist/${queryString}` : `http://localhost:3001/todolist`,
					data: this.todoItem
				});

				if (response.status && response.status == 201) {
				}
				
				this.$store.dispatch('alertOpen', {
					isOpen: true,
					message: queryString ? '수정되었습니다.' : '등록되었습니다.',
					returnURL: '/TodoList'
				});
			}
			catch(ex) {
				console.log('error', ex);
			}
		},
		validationCheck() {
			const todoItem = this.todoItem;

			if (todoItem.title == '') {
				this.$store.dispatch('alertOpen', {
					isOpen: true,
					message: '제목을 입력해주세요.',
				});
				return false;
			}
			else if (todoItem.date == '') {
				this.$store.dispatch('alertOpen', {
					isOpen: true,
					message: '날짜를 선택해주세요.',
				});
				return false;
			}
			else if (todoItem.content == '') {
				this.$store.dispatch('alertOpen', {
					isOpen: true,
					message: '내용을 선택해주세요.',
				});
				return false;
			}

			return true;
		},
	}
}
</script>

<style lang="scss" scoped>
.todo-write {
	&__table {
		display: table;
		width: 100%;
		table-layout: fixed;
		border-collapse: collapse;
		border: {
			top: 1px solid #000;
			bottom: 1px solid #000;
		};
	}

	&__row {
		display: table-row-group;

		&:first-child {
			.todo-write {
				&__title {
					border-top: 0;
				}

				&__content {
					border-top: 0;
				}
			}
		}
	}

	&__title {
		display: table-cell;
		width: 100px;
		padding: 20px 15px;
		border-top: 1px solid #bdbdbd;
		vertical-align: middle;
	}

	&__content {
		display: table-cell;
		width: 540px;
		padding: 20px 15px;
		border-top: 1px solid #bdbdbd;
		vertical-align: top;
	}

	&__form {
		&--input {
			width: 100%;
			height: 34px;
			padding: 0 10px;
		}

		&--textarea {
			width: 100%;
			height: 100px;
			padding: 10px;
		}
	}

	&__btn--area {
		margin-top: 30px;
		text-align: center;
	}
}
</style>