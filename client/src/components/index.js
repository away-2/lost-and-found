import CommentInput from '@/components/commentInput/index.vue'
import CommentList from '@/components/commentList/index.vue'
import CommentFooter from '@/components/commentFooter/index.vue'
import LikeDetailModal from '@/components/likeDetailModal/index.vue'

export default {
    install(app) {
        app.component('commentInput',CommentInput)
           .component('commentList',CommentList)
           .component('commentFooter',CommentFooter)
           .component('likeDetailModal',LikeDetailModal)
    }
}