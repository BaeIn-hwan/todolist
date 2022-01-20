<template>
	<div class="layer-popup">
		<div class="layer-popup__wrapper confirm-layer__wrapper" :style="`width: ${confirmWidth == 0 ? 'auto' : confirmWidth +'px'}; height: ${confirmHeight == 0 ? 'auto' : confirmHeight +'px'};`">

			<p class="confirm-layer__content">{{confirmMessage}}</p>

			<div class="confirm-layer__btn">
				<button type="button" class="todo-common__btn todo-common__btn--black" @click="confirmClose($event, true)">{{yes}}</button>
				<button type="button" class="todo-common__btn todo-common__btn--white" @click="confirmClose($event, false)">{{no}}</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'ConfirmComponent',
	props: {
		confirmOpen: {
			type: Boolean,
			default: false,
			require: true,
		},
		confirmWidth: {
			type: Number,
		},
		confirmHeight: {
			type: Number,
		},
		confirmMessage: {
			type: String,
			require: true,
		},
		yes: {
			type: String,
			default: '예',
		},
		no: {
			type: String,
			default: '아니오',
		}
	},
	methods: {
		confirmClose(e, flag) {
			this.$emit('confirm-close', {
				e,
				flag
			});
		}
	}
}
</script>

<style lang="scss" scoped>
.confirm-layer {
	&__wrapper {
		min-width: 250px;
		max-width: 450px;
		padding: 25px 20px 20px;
	}

	&__content {
		display: flex;
		justify-content: center;
		align-content: center;
		margin-bottom: 20px;
		font-size: 14px;
		line-height: 18px;
		text-align: center;
		word-break: break-all;
		word-wrap: break-word;
	}

	&__btn {
		text-align: center;

		button {
			margin-left: 10px;
		}
	}
}
</style>
