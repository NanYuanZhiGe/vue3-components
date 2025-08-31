# vue3componets

**To Run Server:**

```bash
npm run dev
```

### vue3-split-panel

I wasn't willing to spend my time on this shit. But as I building my vue project, I met an annoying issue.
I used Element-plus and Element-plus-X to build my web, and I want to accomplish a function.
I want to allow user to ajuest elements' size in the page, just like what you often do in your code editor.
But Element-plus didn't provide such an element, or I just blind, but I just can't find it.
I was so confusing that this should be a hot requirement, but why it doesn't provide any element or layout to feed it?
And it actually has an element called "Resizable" in Element-plus-X. But it's extremly hard to use. It's useful, you can adjust it's position and size, but you can't use it in layout. It can't stay at any position you want. It's so annoying and I was so angry, so I look up if there's any ready-made component. I did find one, but there's a lot bug in it. Fine, I'll do it myself.
I'm actually a backend programer, which unfamillar to front programing. President mao said: "Nothing is difficult in the world, only those who have the determination." So I made these two element and offer them to you.

This component is used for code editor like page. You can check my Example at this url: /splitTestView
It contains two components: TwoOverlayComponent and TwoResizeComponent. You can check my code at: @/components
The code is really simple, you can definatlly understand it even though I didn't left comments in it.

And you might ask: **What's the differneces between resized component and overlayed component?**
Alright, the answear is in your question.
The resized components as it's name: it's resizable, so it doesn't has a fixed width or height.
Therefore you can dragger the splitter to change their size, and also change the layout in them.
It my example /splitTestView, I set overflow to hidden and white-space to nowrap so the text in the left component will not change to a new line. However, you can close it. You can adjuest this property to make it more flexiable like set overflow-x to hidden and overflow-y to scroll etc. It's all up to you.
As for overlayed component, it contains a fixed size component and a resizable component. You need to set up a fixed size to an component, and its size it's not change no matter how to drag the splitter. And this component is under the other component, that's what overlay mean. Think about your code editor such as VSCode or Idea. The fixed size component is code area, and resizable component is terminal area. You can lift up terminal area and not change the layout in code area. That's cool and fit user's expectations.

These two component is not perfect yet. There're a lot improvment you can do, such as adjuest splitter's style. Alright, It's all up to you, just download the code and get into the folder then find it's css and change it. It's all on your control.
