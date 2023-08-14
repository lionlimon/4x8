<script lang="ts">
import { PopperWrapper } from 'floating-vue';

export default Object.assign(PopperWrapper, {
  name: 'v-custom-tooltip',
  vPopperTheme: 'my-tooltip'
});
</script>

<style lang="scss" src="./v-custom-tooltip.scss"/>
