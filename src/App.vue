<template>
  <div class="wrapper" id="app">
    <header class="header" id="header">
      <h1 class="header__logo align--center">
        <router-link to="/">TODOLIST</router-link>
      </h1>
    </header>

    <main class="container" id="container">
      <router-view/>
    </main>

    <button type="button" @click="confirmEvent($event)">confirm 오픈</button>

    <!-- <button type="button" @click="alertEvent()">alert 오픈</button>
    
    <button type="button" @click="modalEvent($event)">modal 오픈</button> -->

    <alert-component :alertWidth="$store.state.alert.width" :alertHeight="$store.state.alert.height" :alertMessage="$store.state.alert.message" v-if="$store.state.alert.isOpen"></alert-component>
    
    <confirm-component :confirmWidth="confirm.width" :confirmHeight="confirm.height" :confirmMessage="confirm.message" v-if="confirm.isOpen" @confirm-close="confirmClose($event, flag)"></confirm-component>

    <modal-component :modalWidth="modal.listDetail.width" :modalHeight="modal.listDetail.height" :modalTitle="modal.listDetail.title" v-if="modal.listDetail.isOpen" @modal-close="modalEvent()">
      <div class="list-detail">
        <ul class="list-detail__box">
          <li class="list-detail__list">
            <button type="button" class="todo-common__btn todo-common__btn--black" @click="todoListDetail()">수정</button>
          </li>

          <li class="list-detail__list">
            <button type="button" class="todo-common__btn todo-common__btn--white" @click="todoListDelete()">삭제</button>
          </li>
        </ul>
      </div>
    </modal-component>
  </div>
</template>

<script>
import EventBus from '@/event-bus/'

export default {
  name: 'App',
  data() {
    return {
      confirm: {
        isOpen: false,
        width: 0,
        height: 0,
        message: '',
      },
      modal: {
        listDetail: {
          isOpen: false,
          width: 0,
          hieght: 0,
          title: '상세보기',
          idx: null
        },
      }
    }
  },
  created() {
    EventBus.$on('list-more', this.modalEvent);
  },
  methods: {
    confirmOpen() {
      this.confirm.isOpen = true;
    },
    confirmClose() {
      this.confirm.isOpen = false;
    },
    modalOpen() {
      this.confirm.isOpen = true;
    },
    modalClose() {
      this.confirm.isOpen = false;
    },
    modalEvent(payload) {
      this.modal.listDetail.isOpen = true;
      this.modal.listDetail.idx = payload.listIndex;
    },
    todoListDetail() {
      this.$router.push(`/TodoWrite/${this.modal.listDetail.idx}`);
    },
    async todoListDelete() {
      try {
        const response = await this.$store.dispatch("requestMethods", {
          method: 'delete',
          url: `http://localhost:3001/todolist/${this.modal.listDetail.idx}`
        });

        if (response.status && response.status == 200) {
          this.modal.listDetail.isOpen = false;
        }
      }
      catch(ex) {
        console.error('error', ex);
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  max-width: 640px;
  margin: 0 auto;
}

.header {
  &__logo {
    margin-bottom: 35px;

    a {
      font-size: 36px;
      color: #42b983;
    }
  }
}

.list-detail {
  &__box {
    font-size: 0;
  }

  &__list {
    display: inline-block;
    margin-left: 10px;
    vertical-align: top;

    &:first-child {
      margin-left: 0;
    }
  }
}
</style>