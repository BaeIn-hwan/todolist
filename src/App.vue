<template>
  <div class="wrapper" id="app">
    <header class="header" id="header">
      <div class="header__inner">
        <h1 class="header__logo">
          <router-link to="/">TODOLIST</router-link>
        </h1>

        <div class="header__today">
          <span class="header__today__date">
            {{getTodayYear}}.<br>
            {{getTodayMonth}}. {{getTodayDate}}.
          </span>
          <span class="header__today__day">{{getTodayDay}}</span>
        </div>
      </div>
    </header>

    <main class="container" id="container">
      <router-view ref="pageRouter"/>
    </main>

    <footer class="footer" id="footer">
      <div class="footer__inner">
        <p class="footer__copyright">© 2022. Bae Inhwan Co. all rights reserved.</p>
      </div>
    </footer>

    <div class="ctrl-floating" :class="floatingNav ? 'on': ''">
      <router-link to="/TodoWrite" class="ctrl-floating__btn ctrl-floating__btn--write" v-if="checkWritePage()">
        <font-awesome-icon :icon="['fas','pen']" />
      </router-link>

      <button type="button" class="ctrl-floating__btn ctrl-floating__btn--top" @click="goTop()">
        <span class="blind">상단으로 바로가기</span>
      </button>
    </div>

    <!-- 공통 alert -->
    <alert-component :alertWidth="$store.state.alert.width" :alertHeight="$store.state.alert.height" :alertMessage="$store.state.alert.message" v-if="$store.state.alert.isOpen"></alert-component>
    
    <!-- 삭제하기 confirm -->
    <confirm-component :confirmWidth="confirm.deleteList.width" :confirmHeight="confirm.deleteList.height" :confirmMessage="confirm.deleteList.message" v-if="confirm.deleteList.isOpen" @confirm-close="confirmClose($event)"></confirm-component>

    <!-- Modal Test -->
    <!-- <modal-component :modalWidth="modal.listDetail.width" :modalHeight="modal.listDetail.height" :modalTitle="modal.listDetail.title" v-if="modal.listDetail.isOpen" @modal-close="modalEvent()">
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
    </modal-component> -->
  </div>
</template>

<script>
import eventBus from '@/event-bus'

export default {
  name: 'App',
  data() {
    return {
      listIndex: null,
      floatingNav: false,
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
        // listDetail: {
        //   isOpen: false,
        //   width: 0,
        //   hieght: 0,
        //   title: '상세보기',
        //   idx: null
        // },
      }
    }
  },
  computed: {
    getTodayYear() {
      const year = new Date().getFullYear();

      return year;
    },
    getTodayMonth() {
      const month = new Date().getMonth() + 1;
      
      return month > 10 ? `${month}` : `0${month}`;
    },
    getTodayDate() {
      const date = new Date().getDate();

      return date > 10 ? `${date}` : `0${date}`;
    },
    getTodayDay() {
      const day = new Date().getDay();
      const engDay = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

      return engDay[day];
    },    
  },
  created() {
    eventBus.$on('todoList-delete', this.confirmTodoDelete);
  },
  mounted() {
    window.addEventListener("scroll", this.scrollView);
  },
  methods: {
    checkWritePage() {
      if (this.$route.name == 'TodoWrite') {
        return false;
      }

      return true;
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
    scrollView() {
      const scrollPos = document.documentElement.scrollTop || window.pageYOffset;

      if ( 0 < scrollPos ) this.floatingNav = true;
      else this.floatingNav = false;
    },
    goTop() {
      window.scrollTo(0, 0);
    }
  }
}
</script>

<style lang="scss">
.header {
  background: $green;

  &__inner {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    max-width: 640px;
    margin: 0 auto;
    padding: 50px 20px;
  }

  &__logo {
    font-size: 0;
    text-align: center;

    a {
      font-size: 48px;
      color: #FFF;
    }
  }

  &__today {
    display: flex;
    align-items: center;

    &__date {
      order: 2;
      font-size: 16px;
      color: #FFF;
      line-height: 18px;
    }

    &__day {
      order: 1;
      margin-right: 10px;
      font: {
        size: 36px;
        weight: 600;
      };
      color: #222;
    }
  }
}

.footer {
  margin-top: 50px;
  background: #F8F8F8;

  &__inner {
    padding: 20px 0;
  }

  &__copyright {
    text-align: center;
    font-size: 16px;
    color: #333;
  }
}

.ctrl-floating {
  position: fixed;
  right: 25px;
  bottom: 25px;
  visibility: hidden;
  opacity: 0;

  &.on {
    visibility: visible;
    opacity: 1;
    transition: opacity .25s, visibility .25s;
  }

  &__btn {
    display: block;
    width: 55px;
    height: 55px;
    margin-top: 14px;
    border: 2px solid #e5e5e5;
    border-radius: 50%;
    box-shadow: 2px 4px 4px 0px rgba(0, 0, 0, .1);

    &:first-child {
      margin-top: 0;
    }

    &--write {      
      background: rgba(255, 255, 255, 0.85);
      font-size: 0;
      color: #000;
      text-align: center;
      line-height: 65px;
      
      .fa-pen {
        font-size: 20px;
      }
    }

    &--top {
      background: rgba(255, 255, 255, 0.85) url('~@/assets/images/common/ico_comm_floating-top.png') no-repeat 50% 50%;
    }
  }
}
</style>