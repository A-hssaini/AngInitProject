//Navigation
onSignIn() {
    this.authService.signIn().then(
      () => {
        console.log('Sign in successful!');
        this.authStatus = this.authService.isAuth;
        this.router.navigate(['appareils']);
      }
    );
}

//Recupere les params on utilise ActivaedRoute importer depuis @angluar/router
constructor(private appareilService: AppareilService,
    private route: ActivatedRoute) { }

    ngOnInit() {
        this.name = this.route.snapshot.params['id'];
    }

//Exemple de routing
const appRoutes: Routes = [
    { path: 'appareils', component: AppareilViewComponent },
    { path: 'appareils/:id', component: SingleAppareilComponent },
    { path: 'auth', component: AuthComponent },
    { path: '', component: AppareilViewComponent },
    { path: 'not-found', component: FourOhFourComponent },
    { path: '**', redirectTo: 'not-found' }
  ];

//Guards : Une guard est en effet un service qu'Angular exécutera au moment où l'utilisateur essaye de naviguer vers la route sélectionnée.
//Comme Middleware

//Observale
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs/Subscription';
import 'rxjs/add/observable/interval';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

    secondes: number;
    counterSubscription: Subscription;
  
    ngOnInit() {
      const counter = Observable.interval(1000);
      this.counterSubscription = counter.subscribe(
        (value) => {
          this.secondes = value;
        },
        (error) => {
          console.log('Uh-oh, an error occurred! : ' + error);
        },
        () => {
          console.log('Observable complete!');
        }
      );
    }
  
    ngOnDestroy() {
      this.counterSubscription.unsubscribe();
    }
  }

  function isExist(tab1, tab2){
    let i = 0;
    while (edges[i])
    {
      if (edges[i] == Array(tab1[0], tab2[0]))
        return [true, [tab1[0], tab2[0]]];
      if (edges[i] == Array(tab1[0], tab2[1]))
        return [true, [tab1[0], tab2[1]]];
      if (edges[i] == Array(tab1[1], tab2[0]))
        return [true, [tab1[1], tab2[0]]];
      if (edges[i] == Array(tab1[1], tab2[1]))
        return [true, [tab1[1], tab2[1]]];
      i++;
    }
    return false;
  }


  function getWalk(S){
    let i = 0;
    var res = "";
    while (S.charAt(i + 1)){
      if (vertices[S.charAt(i)] === undefined)
        return -1;
      if (S.charAt(i) == S.charAt(i + 1)){
        res += vertices[S.charAt(i)][0];
        res += vertices[S.charAt(i)][1];
      }
      else {
        // let arr = Array();
        if (isExist(vertices[S.charAt(i)],  vertices[S.charAt(i + 1)])[0]){
          res += isExist(vertices[S.charAt(i)],  vertices[S.charAt(i + 1)])[1][0];
          res += isExist(vertices[S.charAt(i)],  vertices[S.charAt(i + 1)])[1][1];
        }
        else return -1;
      }
      i++;
    }
    return parseInt(res);
  }



function node(){
  this.successeurs = Array();
}

function calculCost(walk){
  var sum = 0;
  for (w of walk)
    sum += w;
  return sum;
}

function searchForWalk(start, restOfStr, occurences, nodes){
  var walk = Array();

  walk.push(start);
  for (v of restOfStr){
    const occ = occurences[v];
    var notFound = 1;
    
    for (o of occ){
      if (nodes[start].includes(o)){
        walk.push(o);
        start = o;
        notFound = 0;
        break;
      }
    if (notFound == 1)
      return -1;
    }
  }
  return walk;
}

function generateGraphAndResolveIt(vertices, edges, string){
  var i = 0;
  var nodes = Array();
  var occurences = {};

  for (v of vertices){
    nodes[i] = new node();
    if (occurences[v]){
      occurences[v] = Array();
      occurences[v].push(i);
    }
    else occurences[v].push(i);
  i++;
  }

  for (e of edges){
    nodes[e[0]].successeurs.push(e[1]);
    nodes[e[1]].successeurs.push(e[0]);
  }

  walk = null;
  minWalk = -1;
  minCost = 0;

  for (start of occurences[string[0]]){
    walk = searchForWalk(start, string.slice(1,string.length), occurences, nodes);
    if (walk != -1){
      cost = calculCost(walk);
      if (cost < minCost || !minCost){
        minCost = cost;
        minWalk = walk; 
      }
    }
  }
  return minWalk;
}