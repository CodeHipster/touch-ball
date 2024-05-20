<!-- Maybe nice idea for the future, lets keep it simple for now. -->

# the entity component system design pattern

This is usefull to separate concerns compared to OOP, where an object could have many different behaviours.

The pattern exists of entities, defined by an identifier.
These entities have components, e.g. a locations in space, a color. 
And related to these components they have behaviours, e.g. touchable, drawable, swipeable
Then the systems apply the behaviours to the entities, using the components. e.g. modify x&y by a drag gesture from the GestureSystem

Around these concepts we could have an entity-graph to store and query the entities and their components. (the entity graph can decide what is the most efficient way of storing the data)
We can have factories for constructing the entities.


## the touch-ball ECS

entities: 
- ball
  - behaviours:
    - draggable
    - drawable
    - touchable
    - boundable

components:
- position
- boundingbox
- color
- shape
- velocity

systems:
- gestureSystem
  - parse touch events and apply them to entities
- drawSystem
  - draw the entities
- boundingSystem
  - keep the entities on the screen
- soundSystem
  - play sounds
- colorSystem
  - color entities

### challanges / Event pattern

Sound... We want to play sound on drag and sound on click. But we don't want the gesturesystem to know anything about sounds.

We can have a sound system, which listens to events like touched, dragged.
The sound system than queries the graph and plays required sound.

Similar for a color system, which colors the entities that have been clicked.

So... besides the entity graph, containing the state of the entities. We can have events that describe actions that happen on the entities. Which might or might not change a state.



