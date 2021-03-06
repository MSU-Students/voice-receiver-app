
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  // For Browser Extension
  {
    path: '/',
    component: () => import('layouts/BEXMainLayout.vue'),
    children: [
      { path: 'popup', component: () => import('pages/PopupPage.vue') },
      { path: 'office', component: () => import('src/pages/InstituitionInfo.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
