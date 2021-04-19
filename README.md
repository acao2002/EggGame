# EggGame

Server:
- Game: 
1. mainplayer 
2. remoteplayer
3. egg 

## 1. Server 

send updates of whether a player touches an egg => trigger Game to remove that egg and spawn more egg and increment points for that player. 

## Game 

update functions that update the state of the game according to user input sent by the server. 

## mainplayer 

- move using w,a,s,d
- Has a method to check whether it hits an egg(called by server to update game state) 

## remoteplayer 

- move using an AI algorithm
- Has a method to check whether it hits an egg(called by server to update game state) 

## egg 

- regulated by the Game element accordingly based on Server input.