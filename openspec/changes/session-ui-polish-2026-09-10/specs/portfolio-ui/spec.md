# portfolio-ui Specification

## Purpose

Interaction contract for the spotlight card wrapper, tools ticker, and shipped UI polish, plus the D1/Q1/Q2 target state.

## Requirements

### Requirement: Spotlight root element

`SpotlightCard` MUST render a configurable root element, defaulting to `div`, overridable by a root-tag prop, and MUST keep `data-spotlight` on any tag. Project cards MUST use an `<article>` root.

#### Scenario: Default root

- GIVEN a card with no root-tag prop
- WHEN it renders
- THEN the root is a `div` carrying `data-spotlight`

#### Scenario: Semantic project card root

- GIVEN the projects list
- WHEN a card renders
- THEN the root is an `<article>` carrying `data-spotlight`

### Requirement: Spotlight initialization lifecycle

Spotlight MUST initialize on initial load and on every client-side navigation or history restore, binding at most once per card.

#### Scenario: Client navigation

- GIVEN a card rendered after client-side navigation
- WHEN the page-load or after-swap event fires
- THEN the card initializes and cursor tracking responds

### Requirement: Spotlight cursor-follow layers

The spotlight MUST render two pointer-tracking overlay layers, hidden from assistive technology, updated via CSS variables at most once per frame, and activated on pointer enter and focus-within.

#### Scenario: Pointer follow

- GIVEN an initialized card
- WHEN the pointer moves over it
- THEN the highlight updates at most once per frame

### Requirement: Spotlight coarse-pointer opt-out

On coarse-pointer devices the spotlight overlays MUST NOT display, while content stays interactive.

#### Scenario: Touch device

- GIVEN a coarse-pointer input
- WHEN a card renders
- THEN the overlays are hidden and the content remains usable

### Requirement: Ticker motion

The ticker MUST loop seamlessly, MUST pause while hovered, and MUST apply edge fades when animated.

#### Scenario: Seamless loop

- GIVEN the animated ticker
- WHEN it runs
- THEN the track translates continuously and loops with no visible jump

#### Scenario: Pause on hover

- GIVEN a pointer over the ticker
- WHEN hover begins
- THEN the animation pauses and resumes on leave

### Requirement: Ticker reduced-motion reachability

Under `prefers-reduced-motion: reduce`, animation MUST be disabled AND every tool MUST remain reachable by wrapping or horizontal scrolling; the animated state MUST be unaffected.

#### Scenario: Reduced motion reachable

- GIVEN reduced motion is requested
- WHEN the ticker renders
- THEN animation is off and every tool is reachable

#### Scenario: Motion unaffected

- GIVEN motion is allowed
- WHEN the ticker renders
- THEN it animates with no wrap or scroll fallback

### Requirement: Ticker assistive-technology handling

The ticker MUST expose the tool list to assistive technology once; the duplicate loop group MUST be hidden from it and removed from the tab order.

#### Scenario: Single announcement

- GIVEN the ticker
- WHEN read by assistive technology
- THEN the list is announced once and the duplicate group is neither announced nor focusable

### Requirement: Tag hover affordance parity

Project-card tags, including the overflow `+N` chip, MUST present the same hover affordance (background, text, ring) on direct hover, independent of card hover.

#### Scenario: Tag hover

- GIVEN a project card
- WHEN a tag is hovered
- THEN background, text, and ring change together

### Requirement: Card image corner radius

The project-card cover image and its clipping container MUST share the card's top corner radius.

#### Scenario: Rounded cover

- GIVEN a project card
- WHEN it renders
- THEN the image link and container use the top rounded radius

### Requirement: Section eyebrow removal

Section eyebrow labels MUST NOT render and their styles MUST NOT remain.

#### Scenario: No eyebrow

- GIVEN the section components and styles
- WHEN rendered or searched
- THEN no eyebrow element or rule is present
