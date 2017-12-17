<template>
<div>
    <div class="row">
      <div class="col-md-8 text-center">
       <content-app></content-app>
      </div>
     </div>
  
</div>
</template>

<script>

import ContentApp from '../components/ContentApp'

export default {
    components:{
        ContentApp
    }

}
</script>
