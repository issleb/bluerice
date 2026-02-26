import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="about">
      <h2>About Blue Rice</h2>

      <p>
        Blue Rice is a comic strip by <strong>Shachar Meron</strong> that ran in the{' '}
        <em>Daily Illini</em> (University of Illinois at Urbana-Champaign) from 1999 to 2002.
      </p>

      <p>
        The strip follows the misadventures of Crouton, Buzz, and a rotating cast of
        characters navigating college life — dorm rooms, bars, classes (sometimes),
        and the eternal question of what to do after graduation.
      </p>

      <p>
        After a nine-year hiatus, Shachar brought Blue Rice back in 2011 with 20 new
        strips and behind-the-scenes commentary on many of the originals.
      </p>

      <h3>The Name</h3>
      <p>
        The most common question: "Where did the name come from?" In college, the gang
        loved Tuesday nights at a campus bar called R&amp;R's — famous for their "shark
        bowls" (big blue cocktails served in a fishbowl with a plastic shark floating
        inside). One time, after having Chinese for dinner, a friend got so drunk that
        he threw up blue rice the next day. Art imitates life.
      </p>

      <h3>This Site</h3>
      <p>
        This is a rebuild of the original <a href="http://bluericecomic.com">bluericecomic.com</a>,
        preserving all 294 original strips plus 20 new ones, along with Shachar's commentary
        and the original character/topic tags.
      </p>
      <p>
        The originals ran in black and white in the newspaper. What you see here are
        Shachar's original GIF files, exactly as drawn.
      </p>

      <div className="about-nav">
        <Link to="/strip/1">Start from Strip #1</Link>
        <Link to="/archive">Browse the archive</Link>
      </div>
    </div>
  );
}
