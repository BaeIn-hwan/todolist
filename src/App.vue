<template>
  <div class="wrapper" id="app">
    <header class="header" id="header">
      <h1 class="header__logo align--center">
        <router-link to="/">TODOLIST</router-link>
      </h1>
    </header>

    <main class="container" id="container">
      <router-view ref="pageRouter"/>
    </main>

    <!-- 공통 alert -->
    <alert-component :alertWidth="$store.state.alert.width" :alertHeight="$store.state.alert.height" :alertMessage="$store.state.alert.message" v-if="$store.state.alert.isOpen"></alert-component>
    
    <!-- 삭제하기 confirm -->
    <confirm-component :confirmWidth="confirm.deleteList.width" :confirmHeight="confirm.deleteList.height" :confirmMessage="confirm.deleteList.message" v-if="confirm.deleteList.isOpen" @confirm-close="confirmClose($event)"></confirm-component>

    <!-- Modal Test -->
    <modal-component :modalWidth="modal.listDetail.width" :modalHeight="modal.listDetail.height" :modalTitle="modal.listDetail.title" v-if="modal.listDetail.isOpen" @modal-close="modalEvent()">
      <div class="list-detail">
        <ul class="list-detail__box">
          <li class="list-detail__list">
            <button type="button" class="todo-common__btn todo-common__btn--black">수정</button>
          </li>

          <li class="list-detail__list">
            <button type="button" class="todo-common__btn todo-common__btn--white">삭제</button>
          </li>
        </ul>
      </div>
    </modal-component>
  </div>
</template>

<script>
import eventBus from '@/event-bus'

export default {
  name: 'App',
  data() {
    return {
      listIndex: null,
      confirm: {
        deleteList: {
          isOpen: false,
          width: 0,
          height: 0,
          message: null,
          idx: null,
        }
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
    eventBus.$on('todoList-delete', this.confirmTodoDelete);
  },
  methods: {
    confirmTodoDelete({idx}) {
      const confirmDelete = this.confirm.deleteList;

      if (!confirmDelete.isOpen) {
        this.listIndex = idx;
        confirmDelete.isOpen = true;
        confirmDelete.message = '리스트를 삭제하시겠습니까?';
      }
    },
    confirmClose({flag}) {
      const confirmDelete = this.confirm.deleteList;

      if (flag) {
        this.todoListDelete();
      }
      else {
        confirmDelete.isOpen = false;
      }
    },
    async todoListDelete() {
      try {
        const response = await this.$store.dispatch("requestMethods", {
          method: 'delete',
          url: `http://localhost:3001/todolist/${this.listIndex}`
        });

        if (response.status && response.status == 200) {
          this.$refs.pageRouter.requestTodoList();
          this.confirmClose(false);
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