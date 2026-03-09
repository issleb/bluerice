import { useEffect } from 'react';

export default function Foreword1() {
  useEffect(() => {
    document.title = 'Foreword - Rice Rice Baby - Blue Rice';
  }, []);

  return (
    <div className="about">
      <h2>Foreword to <em>Rice Rice Baby</em></h2>
      <p className="foreword-byline"><em>by Shachar Meron</em></p>

      <p>
        So here it is, the collection of the first year of Blue Rice comics. Chances
        are that you skipped this intro and read some strips before flipping back to this
        page, which works for me; if pretty pictures didn't attract more attention than large
        paragraphs of text, I'd be out of a job.
      </p>

      <p>
        I figured I'd use this space to cover all the questions I usually get, the most
        common of which asks how I came up with the name "Blue Rice." This is
        actually something of a disgusting story, so those of you who are weak of heart
        please skip down to the next paragraph. Alright, here it is: Some time ago, some
        friends of mine and I went out to eat dinner at a Chinese restaurant, where my
        friend Buzz (yes, that Buzz) ate a whole lot of white rice. Later that night, we all
        went out to a certain bar that offers a large pitcher full of blue-colored, very
        alcoholic drink, and Buzz perhaps drank too much of it because that very night he
        threw up — you guessed it — blue rice. I think he asked that I never tell that story.
        Oh well.
      </p>

      <p>
        As for coming up with the actual comic, that was a little more difficult. I
        don't want to over-dramatize its conception, but the way it really happened was
        that I was lying awake in bed at around 5 a.m. one night when I was suddenly
        struck with something that I suppose could be interpreted as inspiration (that, or
        indigestion). I immediately got up and wrote down the script for the first eight
        Blue Rice comics (I had already doodled some of the characters a few days
        earlier), and over the next couple of days I sat down and drew them up. To this
        day it still weighs on my mind just how terribly drawn those first few strips are
        and just how ugly Crouton and Buzz were at that time.
      </p>

      <p>
        Over the course of the year, Blue Rice evolved quite a bit both in its
        appearance and its style. The bar became the focus of the strip, but I tried to veer
        away from overusing alcohol-related jokes (believe it or not). Crouton's hair
        changed length several times; Buzz grew about a foot in height; Cain's scowl got
        worse, while Katy's eyes (and chest, from what I've been told) grew to enormous
        proportions; and the Mushroom appeared less and less, while at the same time the
        gnome practically took over the strip. None of this was planned. Evolution is
        inevitable when you do something every damn day.
      </p>

      <p>
        So now I'm done blabbing, and you can get back to the interesting parts of
        the book. Just remember a few things as you read, though. If you found
        something offensive the first time around and already sent me a letter about it, yes,
        I did get your letter and I'm only reprinting the strip for nostalgic purposes, so
        don't send more letters. If you find yourself at all entertained by the book, drop
        me a line sometime and let me know (meron@uiuc.edu).
      </p>

      <p>
        And keep in mind that Blue Rice is full of substance abuse, sexual
        innuendo and foul language, so don't show it to your younger siblings unless you
        want them to turn out like you.
      </p>

      <p>Peace out, yo.</p>
    </div>
  );
}
