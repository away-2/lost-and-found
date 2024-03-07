import CommentInput from '@/components/commentInput/index.vue'
import CommentList from '@/components/commentList/index.vue'
import CommentFooter from '@/components/commentFooter/index.vue'
import LikeDetailModal from '@/components/likeDetailModal/index.vue'
import HotTopicItem from '@/components/hotTopicItem/index.vue'
import UserInfoPopover from '@/components/userInfoPopover/index.vue'
import VerifyCode from '@/components/verifyCode/index.vue'
import BackTop from '@/components/backTop/index.vue'
import EmptyStatus from '@/components/emptyStatus/index.vue'


export default {
    install(app) {
        app.component('commentInput',CommentInput)
           .component('commentList',CommentList)
           .component('commentFooter',CommentFooter)
           .component('likeDetailModal',LikeDetailModal)
           .component('hotTopicItem',HotTopicItem)
           .component('userInfoPopover',UserInfoPopover)
           .component('verifyCode', VerifyCode)
           .component('backTop', BackTop)
           .component('emptyStatus', EmptyStatus)
    }
}