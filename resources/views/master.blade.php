<!DOCTYPE html>
<html lang="en" xmlns:v-on="http://www.w3.org/1999/xhtml">
@include('shared._head')
<body id="body" style="background-color: #fafafa !important;">

<div id="app" v-cloak>

    <nav-mobile></nav-mobile>

    <nav-header></nav-header>

    <div v-if="isAuthenticated && isNotVerified" class="callout alert-box warning" data-closable>
            Please check your e-mail and verify your account to get involved! Check your spam folder just in case.
            <a v-on:click="requestVerificationEmail" data-close>Click here to resend verification email</a>
            <button class="close-button" aria-label="Dismiss alert" type="button" data-close>
                <span aria-hidden="true">&times;</span>
            </button>
        </div>

        {{--<div v-if="justVerified()" class="callout alert-box warning" data-closable>
            Account Verification Successful!
            <button class="close-button" aria-label="Dismiss alert" type="button" data-close>
                <span aria-hidden="true">&times;</span>
            </button>
        </div>--}}

    <authentication-modal></authentication-modal>

    <div class="md-layout md-alignment-top-center">
        {{-- Causes Error: Cannot read property 'parentNode' of null --}}
        <md-snackbar md-position="center" :md-active.sync="showSnackbar" ref="snackbar" :md-duration="toastDuration">
            <span v-text="toastMessage"></span>
            <md-button v-if="toastType === 'action'" class="md-accent" md-theme="light-blue" @click.prevent="toastAction" v-text="toastButton"></md-button>
            <md-button class="md-accent" md-theme="light-blue" @click.prevent="$refs.snackbar.close()">Close</md-button>
        </md-snackbar>

        <div class="md-layout-item md-size-100">
            @yield('layout')
        </div>

        <div class="md-layout-item md-size-100">
            @include('shared.footer')
        </div>
    </div>
    {{--@include('shared.offCanvasRight')--}}
</div>

@include('shared._footer')
</body>
</html>
