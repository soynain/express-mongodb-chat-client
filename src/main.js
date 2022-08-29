import App from './App.vue';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import router from './router'
import { createApp, provide, h } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { ApolloClient, createHttpLink, from, InMemoryCache, split } from '@apollo/client/core'
import { createClient } from 'graphql-ws';
import { WebSocket } from 'ws';
import NavBarComponent from './components/NavBarComponent.vue';

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'http://localhost:3000/usuario/graphql',
})

const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://localhost:4000/usuario/subscriptions/graphql',
  webSocketImpl: WebSocket
}));

// Cache implementation
const cache = new InMemoryCache()

/*Doesnt work for me, apollo docs indicates that
websocket can work to perform all types of operations
anyways, I dont like it but for now I'll be depending with the
socket*/
/*const linkSplitter = ApolloLink.split(({ query }) => {
  const definition = getMainDefinition(query)
 // console.log(definition)
  return (
    definition.kind === "OperationDefinition" &&
    definition.operation === "subscription"
  )
},
wsLink,
httpLink);*/

// Create the apollo client
const apolloClient = new ApolloClient({
  link: wsLink,
  cache,
})

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },

  render: () => h(App),
})

const NavBar = createApp(NavBarComponent);


router.beforeEach((to, from, next) => {
 /* let user_info = JSON.parse(localStorage.getItem('access-token'));
  console.log(user_info)
  if(user_info!==null){
    console.log(user_info,' punto imposible');
    if (user_info.usuario_id === undefined && to.name !== 'login') {
      next({ name: 'login' });
    }else if(user_info.usuario_id!==undefined && to.name==='login'){
      next({name:'dashboard'});
    }else next();
  }else{
    console.log(user_info,'  no existe');
    next({ name: 'login' });
  }*/
 // let user_info = JSON.parse(localStorage.getItem('access-token'));
  if(localStorage.getItem('access-token')===null && to.name!=='login'){
    next({name:'login'});
  }else if(localStorage.getItem('access-token')!==null && to.name==='login'){
    next({name:'dashboard'});
  }else{
    next();
  }
});

app.use(router);
NavBar.use(router);

app.mount('#app');
NavBar.mount('#navArea');
