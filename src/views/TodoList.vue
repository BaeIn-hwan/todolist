<template>
	<article class="content todo-list">
		<h2 class="blind">TODOLIST</h2>

		<div class="todo-list__header align--right">
			<router-link to="/TodoWrite" class="todo-common__btn todo-common__btn--green">등록</router-link>
		</div>

		<template v-if="load.todolist === false">
			<ul class="todo-list__box">
				<li class="todo-list__list" v-for="index in 5" :key="index">
					<div class="todo-list__list__inner">
						<span class="todo-list__list__checkbox todo-skeleton"></span>

						<div class="todo-list__list__content">
							<p class="todo-list__list__txt todo-skeleton"></p>
							<span class="todo-list__list__date todo-skeleton"></span>
						</div>

						<span class="todo-list__list__controller todo-skeleton"></span>
					</div>
				</li>
			</ul>
		</template>

		<template v-else-if="load.todolist === true">
			<ul class="todo-list__box">
				<template v-if="todoList && todoList.length">
					<li class="todo-list__list" v-for="(list, index) in todoList" :key="index">
						<div class="todo-list__list__inner">
							<label class="todo-list__list__checkbox">
								<input type="checkbox" class="blind" v-model="list.completed">
								<span></span>
							</label>

							<div class="todo-list__list__content">
								<p class="todo-list__list__txt">{{list.content}}</p>
								<span class="todo-list__list__date">{{list.date}}</span>
							</div>

							<div class="todo-list__list__controller">
								<button type="button" class="controller__btn" @click="todoControllerEvent($event, list.id)">
									<span class="blind">더 보기</span>
								</button>

								<ul class="controller__box" v-if="todoControllerIdx === list.id">
									<li class="controller__list">
										<button type="button" @click="todoControllerMove('update', list.id)">수정</button>
									</li>

									<li class="controller__list">
										<button type="button" @click="todoControllerMove('delete', list.id)">삭제</button>
									</li>
								</ul>
							</div>
						</div>
					</li>
				</template>

				<template v-else>
					<li class="todo-list__empty">리스트가 없습니다.</li>
				</template>
			</ul>
		</template>

		<template v-else-if="load.todolist === 'error'">
			<div class="todo-error">
				<p class="todo-error__txt">페이지 오류</p>
				<button type="button" class="todo-error__btn">재시도</button>
			</div>
		</template>
	</article>
</template>

<script>
export default {
	data() {
		return {
			load: {
				todolist: false,
			},
			todoList: [],
			todoControllerIdx: null,
		}
	},
	created() {
		this.requestTodoList();
	},
	methods: {
		async requestTodoList() {
			try {
				const response = await this.$store.dispatch("requestMethods", {
					method: 'GET',
					url: `http://localhost:3001/todolist`,
				});

				this.load.todolist = true;

				if (response.data && response.data.length) {
					this.todoList = response.data;
				}
			}
			catch(ex) {
				console.error('error', ex);
			}
		},
		todoControllerEvent(e, idx) {
			if (this.todoControllerIdx === idx) {
				this.todoControllerIdx = '';
			}
			else {
				this.todoControllerIdx = idx;
			}
		},
		async todoControllerMove(type, idx) {
			if (type === 'update') {
				this.$router.push(`/TodoWrite?update=${idx}`);
			}
			else if (type === 'delete') {
				try {
					const response = await this.$store.dispatch("requestMethods", {
						method: 'delete',
						url: `http://localhost:3001/todolist/${idx}`
					});

					if (response.status && response.status == 200) {
						this.requestTodoList();
					}
				}
				catch(ex) {
					console.error('error', ex);
				}
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.todo-list {
	&__header {
		font-size: 0;

		&__btn {
			display: inline-block;
			padding: 0 15px;
			height: 36px;
			background: #42b983;
			color: #FFF;
			line-height: 36px;
		}
	}

	&__box {
		margin-top: 20px;
		border: {
			top: 1px solid #000;
			bottom: 1px solid #000;
		};
	}

	&__list {
		padding: 20px 15px;
		border-top: 1px solid #bdbdbd;

		&:first-child {
			border-top: 0;
		}

		&__inner {
			position: relative;
		}

		&__checkbox {
			position: absolute;
			top: 0;
			left: 0;
			width: 24px;
			height: 24px;

			input {
				& + span {
					display: block;
					width: 100%;
					height: 100%;
					border: 2px solid #999;
					border-radius: 50%;
					transition: all .35s;
					cursor: pointer;

					&:before {
						content: '';
						position: absolute;
						top: 50%;
						left: 50%;
						width: 0;
						height: 0;
						border-radius: 50%;
						background: transparent;
						transform: translate3d(-50%, -50%, 0);
						transition: all .35s;
					}
				}

				&:checked + span {
					position: relative;
					border: 2px solid #53b983;

					&:before {
						width: 14px;
						height: 14px;
						background: #53b983;
					}
				}
			}
		}

		&__content {
			padding: 0 50px 0 35px;
		}

		&__txt {
			min-height: 24px;
			font-size: 20px;
			line-height: 24px;
			@include line();
		}

		&__date {
			display: block;
			min-height: 16px;
			margin-top: 15px;
			font-size: 16px;
			color: #666;
		}

		&__controller {
			position: absolute;
			top: 0;
			right: 0;
			width: 30px;
			height: 30px;
			
			.controller {
				&__btn {
					width: 30px;
					height: 30px;
					background: url(~@/assets/images/common/ico_comm_btn-more.png) no-repeat 50% 50%;	
				}

				&__box {
					position: absolute;
					z-index: 1;
					top: 35px;
					left: -20px;
					width: 70px;
					padding: 15px 10px;
					border: 1px solid #ccc;
					background: #FFF;

					&:before {
						content: "";
						display: block;
						position: absolute;
						z-index: -1;
						top: -6px;
						right: 28px;
						width: 10px;
						height: 10px;
						background: #fff;
						border: {
							top: 1px solid #ccc;
							left: 1px solid #ccc;
						};
						transform: rotate(45deg);
					}
				}

				&__list {
					margin-top: 14px;
					text-align: center;

					&:first-child {
						margin-top: 0;
					}

					button {
						font-size: 14px;
						color: #333;

						&:hover {
							text-decoration: underline;
						}
					}
				}
			}
		}
	}

	&__empty {
		padding: 100px 0;
		border-bottom: 1px solid #bdbdbd;
		font-size: 16px;
		text-align: center;
	}
}
</style>