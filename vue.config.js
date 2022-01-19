module.exports = {
	lintOnSave: false,	// ESLint 설정 끄는 방법
	css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/assets/scss/_styles.scss"
        ;`,
      },
    }
  }
}