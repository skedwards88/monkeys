export const rules = [
 {
  text: `A crew of monkeys--with you as the captain--overthrew their pirate overlords. But it is not gold you want. Nay, coconuts are the bounty you seek.\n\nAlas! There be limited space on the sea. Compete for control of sea routes to get the most coconuts.`,
  image: "coconuts",
  alt: "coconut artwork"
 },
 {
   text: `Two competing monkey pirate fleets vie for the most coconuts.\n\nEach player will control a fleet.`,
   image: "two_ships",
   alt: "two ship artwork"
 },
 {
   text: `The board starts with the sea routes (black lines) that existed immediately after the mutinies. New routes will be built from these initial routes.`,
   animation: "starting",
 },
 {
   text: `Players take turns dragging a tile from the offer to the board. At least one sea route on the new tile must connect to an existing sea route.`,
   animation: "turns"
 },
 {
   text: `The number of coconuts on the route determines the value of the route.`,
   animation: "coconut-count",
   caption: "1 single and 2 double coconuts for 3 total coconuts"
 },
 {
   text: "A chest doubles the number of coconuts on the route.\n\nMultiple chests on the route have the same effect as a single chest.",
   image: "chest",
   alt: "route with 3 coconuts and a chest",
   caption: "The chest makes these 3 coconuts count as 6 coconuts"
 },
 {
   text: `The player with the most ships on a route owns the coconuts on that route. If players tie, neither player owns the coconuts for the route. As players vie for control, the score will change.`,
   image: "route",
   alt: "route with 2 red ships and 3 blue ships",
   caption: "2 red ships and 3 blue ships means blue controls all of the coconuts on this route"
 },
 {
   text: `An anchor at the end of a route doubles the ships of that color on the route. Two anchors of the same color on the route have the same effect as a single anchor.`,
   image: "route_and_anchor",
   alt: "route with 2 red ships and an anchor",
   caption: "The red anchor makes the 2 red ships count as 4 ships, so red owns all of the coconuts on this route."
 },
 {
   text: `The game ends once all tiles have been placed.\n\nThe player that owns the most coconuts at the end of the game wins!`,
   image: "coconuts",
   alt: "coconut artwork"
 },
];
