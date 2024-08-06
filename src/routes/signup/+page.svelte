<script lang="ts">
  import { enhance } from '$app/forms';

  import type { ActionData } from './$types';

  export let form: ActionData;
</script>

<section>
  <form method="post" use:enhance>
    <div class="group">
      <label for="email">Email</label>
      <input type="email" name="email" id="email" class="text-black" required />
    </div>

    <div class="group">
      <label for="password">Password</label>
      <input type="password" name="password" id="password" class="text-black" required />
    </div>

    <div class="submit-container">
      <button type="submit">Login</button>
    </div>

    {#if form?.error}
      <div class="notice error">
        {form.error}
      </div>
    {/if}
  </form>

  <div class="actions">
    <a href="/signup">Sign Up</a>
  </div>
</section>