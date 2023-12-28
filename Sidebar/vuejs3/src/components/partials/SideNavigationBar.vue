<script setup lang="ts">
    import { ref } from "vue";
    import { onClickOutside } from '@vueuse/core';
    import * as $_ from 'lodash';
    
    const sidebar = ref({
        full: true,
        active: "dashboard",
        navOpen: false
    });

    const navigation = ref({
        dashboard: {
            show: false
        },
        audience: {
            show: false,
            dropdown: {
                open: false,
            }
        },
        posts: {
            show: false,
        },
        schedules: {
            show: false,
        },
        income: {
            show: false,
            dropdown: {
                open: false,
                subDropdown: {
                    open: false
                }
            }
        },
        promote: {
            show: false,
            dropdown: {
                open: false,
            }
        },
    });

    const toggleClasses = {
        visibleClass: 'block sm:absolute -top-7 sm:border border-gray-800 left-5 sm:text-sm sm:bg-gray-900 sm:px-2 sm:py-1 sm:rounded-md',
        activeClass: 'bg-gray-800 text-gray-200',
        expandedClass: 'border-l border-gray-400 ml-4 pl-4',
        shrinkedClass: 'sm:absolute top-0 left-20 sm:shadow-md sm:z-10 sm:bg-gray-900 sm:rounded-md sm:p-4 border-l sm:border-none border-gray-400 ml-4 pl-4 sm:ml-0 w-28',
        subExpandedClass: 'border-l border-gray-400 ml-4 pl-4',
        subShrinkedClass: 'sm:absolute top-0 left-28 sm:shadow-md sm:z-10 sm:bg-gray-900 sm:rounded-md sm:p-4 border-l sm:border-none border-gray-400 ml-4 pl-4 sm:ml-0 w-28'
    };

    const toggleOpenSidebar = () => {
        sidebar.value.navOpen =!sidebar.value.navOpen;
    };

    const toggleFullSidebar = () => {
        sidebar.value.full =!sidebar.value.full;
    };

    const toggleShowNavigationItem = (navigationItem: string, show: boolean) => {
        navigation.value[navigationItem].show = show;
    };

    const toggleDropdown = (link: string) => {
        navigation.value[link].dropdown.open = !navigation.value[link].dropdown.open;
        sidebar.value.active = link;
    };

    const toggleSubDropdown = (link: string) => {
        navigation.value[link].dropdown.subDropdown.open = !navigation.value[link].dropdown.subDropdown.open;
        //sidebar.value.active = link;
    };

    const changeActiveLink = (link: string) => {
        sidebar.value.active = link;
    };

    const targetDropdown    = ref(null)
    const targetSubDropdown = ref(null)

    onClickOutside(targetDropdown, () => {
        const activeLink = sidebar.value.active
        navigation.value[activeLink].dropdown.open = false
        if ($_.has(navigation.value[activeLink].dropdown, 'subDropdown')) {
            navigation.value[activeLink].dropdown.subDropdown.open = false
        }
    })

    onClickOutside(targetSubDropdown, () => {
        const activeLink = sidebar.value.active;
        navigation.value[activeLink].dropdown.subDropdown.open = false;
    })

</script>

<template>
    <button @click="toggleOpenSidebar()" class="sm:hidden absolute top-5 right-5 focus:outline-none">
        <!-- Menu Icons -->
        <svg xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            :class="[sidebar.navOpen ? 'hidden' : '']"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16m-7 6h7" />
        </svg>

        <!-- Close Menu -->
        <svg xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            :class="[sidebar.navOpen ? '' : 'hidden']"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12" />
        </svg>
    </button>

    <div class="h-screen bg-gray-900 transition-all duration-300 space-y-2 fixed sm:relative"
        :class="{
            'w-64':                     sidebar.full,
            'w-20 sm:w-64':             !sidebar.full,
            'top-0 left-0':             sidebar.navOpen,
            'top-0 -left-64 sm:left-0': !sidebar.navOpen
        }"
    >

        <h1 class="text-white font-black py-4"
            :class="[sidebar.full ? 'text-2xl px-4' : 'text-xl px-4 xm:px-2']">LOGO</h1>

        <div class="px-4 space-y-2">

            <!-- SideBar Toggle -->
            <button @click="toggleFullSidebar()" class="hidden sm:block focus:outline-none absolute p-1 -right-3 top-10 bg-gray-900 rounded-full shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 transition-all duration-300 text-white transform"
                    :class="[sidebar.full ? 'rotate-90' : '-rotate-90']"
                    viewBox="0 0 20 20"
                    fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd" />
                </svg>
            </button>
            <!-- Dashboard -->
            <div v-on:click="changeActiveLink('dashboard')"
                v-on:mouseover="toggleShowNavigationItem('dashboard', true)"
                v-on:mouseleave="toggleShowNavigationItem('dashboard', false)"
                class=" relative flex items-center hover:text-gray-200 hover:bg-gray-800 space-x-2 rounded-md p-2 cursor-pointer"
                :class="{
                    'justify-start': sidebar.full,
                    'sm:justify-center': !sidebar.full,
                    'text-gray-200 bg-gray-800': sidebar.active === 'dashboard',
                    'text-gray-400': sidebar.active !== 'dashboard'
                }">
                <svg xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                    <path stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <h1 
                    :class="[!sidebar.full && navigation.dashboard.show ? toggleClasses.visibleClass : '' || !sidebar.full && !navigation.dashboard.show ? 'sm:hidden' : '']">
                    Dashboard
                </h1>
            </div>

            <!-- Audience -->
            <div class="relative">
                <!-- Dropdown head -->
                <div v-on:click="toggleDropdown('audience')"
                    v-on:mouseover="toggleShowNavigationItem('audience', true)"
                    v-on:mouseleave="toggleShowNavigationItem('audience', false)"
                    class="flex justify-between text-gray-400 hover:text-gray-200 hover:bg-gray-800 items-center space-x-2 rounded-md p-2 cursor-pointer"
                    :class="{
                        'justify-start': sidebar.full,
                        'sm:justify-center': !sidebar.full,
                        'text-gray-200 bg-gray-800': sidebar.active === 'audience',
                        'text-gray-400': sidebar.active !== 'audience'
                    }">
                    <div class="relative flex space-x-2 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            class="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <h1 
                            :class="[!sidebar.full && navigation.audience.show ? toggleClasses.visibleClass : '' || !sidebar.full && !navigation.audience.show ? 'sm:hidden' : '']">
                            Audience
                        </h1>
                    </div>
                    <svg :class="[sidebar.full ? '' : 'sm:hidden']"
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clip-rule="evenodd" />
                    </svg>
                </div>
                <!-- Dropdown content -->
                <div v-if="navigation.audience.dropdown.open"
                    ref="targetDropdown"
                    :class="sidebar.full ? toggleClasses.expandedClass : toggleClasses.shrinkedClass"
                    class="text-gray-400 space-y-3 ">
                    <h1 class="hover:text-gray-200 cursor-pointer">Item 1</h1>
                    <h1 class="hover:text-gray-200 cursor-pointer">Item 2</h1>
                    <h1 class="hover:text-gray-200 cursor-pointer">Item 3</h1>
                    <h1 class="hover:text-gray-200 cursor-pointer">Item 4</h1>
                </div>
            </div>

            <!-- Posts -->
            <div v-on:click="changeActiveLink('posts')"
                v-on:mouseover="toggleShowNavigationItem('posts', true)"
                v-on:mouseleave="toggleShowNavigationItem('posts', false)"
                    class=" relative flex justify-between items-center text-gray-400 hover:text-gray-200 hover:bg-gray-800 space-x-2 rounded-md p-2 cursor-pointer"
                    :class="{
                        'justify-start': sidebar.full, 
                        'sm:justify-center': !sidebar.full,
                        'text-gray-200 bg-gray-800': sidebar.active == 'posts',
                        'text-gray-400 ': sidebar.active != 'posts'
                    }">
                <div class="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h1 :class="[ !sidebar.full && navigation.posts.show ? toggleClasses.visibleClass : '' || !sidebar.full && !navigation.posts.show ? 'sm:hidden' : '' ]">
                        Posts
                    </h1>
                </div>
                <h1 :class="[ sidebar.full ? '' : 'sm:hidden' ]"
                    class="w-5 h-5 p-1 bg-green-400 rounded-sm text-sm leading-3 text-center text-gray-900">8</h1>
            </div>

            <!-- Schedules -->
            <div v-on:click="changeActiveLink('schedules')"
                v-on:mouseover="toggleShowNavigationItem('schedules', true)"
                v-on:mouseleave="toggleShowNavigationItem('schedules', false)"
                    class=" relative flex justify-between items-center text-gray-400 hover:text-gray-200 hover:bg-gray-800 space-x-2 rounded-md p-2 cursor-pointer"
                    :class="{
                        'justify-start': sidebar.full, 
                        'sm:justify-center': !sidebar.full,
                        'text-gray-200 bg-gray-800': sidebar.active == 'schedules',
                        'text-gray-400 ': sidebar.active != 'schedules'
                    }">
                <div class="flex  items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <h1 :class="[!sidebar.full && navigation.schedules.show ? toggleClasses.visibleClass : '' || !sidebar.full && !navigation.schedules.show ? 'sm:hidden' : '']">
                        Schedules</h1>
                </div>
                <div :class="[sidebar.full ? '' : 'sm:hidden' ]"
                    class="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1"
                            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h1 class="w-5 h-5 p-1 bg-pink-400 rounded-sm text-sm leading-3 text-center text-gray-900">3
                    </h1>
                </div>
            </div>

            <!-- Income -->
            <div class="relative">
                <!-- Dropdown head -->
                <div v-on:click="toggleDropdown('income')"
                    v-on:mouseover="toggleShowNavigationItem('income', true)"
                    v-on:mouseleave="toggleShowNavigationItem('income', false)"
                    class="flex justify-between text-gray-400 hover:text-gray-200 hover:bg-gray-800 items-center space-x-2 rounded-md p-2 cursor-pointer"
                    :class="{
                        'justify-start': sidebar.full, 
                        'sm:justify-center': !sidebar.full,
                        'text-gray-200 bg-gray-800': sidebar.active == 'income',
                        'text-gray-400 ': sidebar.active != 'income'
                    }">
                    <div class="relative flex space-x-2 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            class="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                            <path stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                        </svg>
                        <h1 :class="[!sidebar.full && navigation.income.show ? toggleClasses.visibleClass : '' || !sidebar.full && !navigation.income.show ? 'sm:hidden' : '']">
                            Income
                        </h1>
                    </div>
                    <svg x-cloak x-bind:class="sidebar.full ? '':'sm:hidden'"
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clip-rule="evenodd" />
                    </svg>
                </div>
                <!-- Dropdown content -->
                <div ref="targetDropdown" 
                    v-if="navigation.income.dropdown.open"    
                    :class="[ sidebar.full ? toggleClasses.expandedClass : toggleClasses.shrinkedClass ]"
                    class="text-gray-400 space-y-3">
                    <h1 class="hover:text-gray-200 cursor-pointer">Item 1</h1>
                    <h1 class="hover:text-gray-200 cursor-pointer">Item 2</h1>
                    <!-- Sub Dropdown  -->
                    <div class="relative w-full">
                        <div v-on:click="toggleSubDropdown('income')"
                            class="flex items-center justify-start cursor-pointer">
                            <h1 class="hover:text-gray-200 cursor-pointer">Item 3</h1>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                class="h-4 w-4 ms-3"
                                viewBox="0 0 20 20"
                                fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clip-rule="evenodd" />
                            </svg>
                        </div>
                        <div ref="targetSubDropdown"
                            v-if="navigation.income.dropdown.subDropdown.open"
                            :class="[sidebar.full ? toggleClasses.subExpandedClass : toggleClasses.subShrinkedClass]">
                            <h1 class="hover:text-gray-200 cursor-pointer ">Sub Item 1</h1>
                            <h1 class="hover:text-gray-200 cursor-pointer ">Sub Item 2</h1>
                            <h1 class="hover:text-gray-200 cursor-pointer ">Sub Item 3</h1>
                        </div>
                    </div>
                    <h1 class="hover:text-gray-200 cursor-pointer">Item 4</h1>
                </div>
            </div>

            <!-- Promote -->
            <div class="relative">
                <!-- Dropdown head -->
                <div v-on:click="toggleDropdown('promote')"
                    v-on:mouseover="toggleShowNavigationItem('promote', true)"
                    v-on:mouseleave="toggleShowNavigationItem('promote', false)"
                        class="flex justify-between text-gray-400 hover:text-gray-200 hover:bg-gray-800 items-center space-x-2 rounded-md p-2 cursor-pointer"
                        :class="{
                            'justify-start': sidebar.full, 
                            'sm:justify-center': !sidebar.full,
                            'text-gray-200 bg-gray-800': sidebar.active == 'promote',
                            'text-gray-400 ': sidebar.active != 'promote'
                        }">
                    <div class="relative flex space-x-2 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            class="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                        <h1 :class="[!sidebar.full && navigation.promote.show ? toggleClasses.visibleClass : '' || !sidebar.full && !navigation.promote.show ? 'sm:hidden' : '' ]">
                            Promote
                        </h1>
                    </div>
                    <svg :class="[ sidebar.full ? '' : 'sm:hidden' ]"
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor">
                        <path fill-rule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clip-rule="evenodd" />
                    </svg>
                </div>
                <!-- Dropdown content -->
                <div ref="targetDropdown"
                    v-if="navigation.promote.dropdown.open"
                    :class="[ sidebar.full ? toggleClasses.expandedClass : toggleClasses.shrinkedClass ]"
                    class="text-gray-400 space-y-3">
                    <h1 class="hover:text-gray-200 cursor-pointer">Item 1</h1>
                    <h1 class="hover:text-gray-200 cursor-pointer">Item 2</h1>
                    <h1 class="hover:text-gray-200 cursor-pointer">Item 3</h1>
                    <h1 class="hover:text-gray-200 cursor-pointer">Item 4</h1>
                </div>
            </div>
        </div>
    </div>
</template>