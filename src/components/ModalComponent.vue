<template>
	<div class="layer-popup">
		<div class="layer-popup__wrapper modal-layer__wrapper">
			<template v-if="modalTitle && modalTitle.length">
				<div class="modal-layer__header">
					<strong class="modal-layer__header__title">{{modalTitle}}</strong>
					<button type="button" class="modal-layer__header__close" @click="modalClose($event)">
						<span class="blind">닫기</span>
					</button>
				</div>
			</template>

			<slot/>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ModalComponent',
	props: {
		modalOpen: {
			type: Boolean,
			default: false,
			require: true,
		},
		modalWidth: {
			type: Number,
			default: null,
		},
		modalHeight: {
			type: Number,
			default: null,
		},
		modalTitle: {
			type: String,
			default: null,
		},
	},
	methods: {
		modalClose(e) {
			this.$emit('modal-close', {
				e,
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.modal-layer {
	&__wrapper {
		padding: 20px 25px;
	}

	&__header {
		position: relative;
		margin-bottom: 20px;
		padding-bottom: 15px;
		border-bottom: 1px solid #000;
		font-size: 0;

		&__title {
			display: block;
			font: {
				size: 24px;
				weight: 500;
			};
		}

		&__close {
			position: absolute;
			top: 3px;
			right: 0;
			width: 18px;
			height: 18px;
			background: url(~@/assets/images/common/ico_comm_popup-close.png) no-repeat 0 0;
		}
	}
}
</style>
