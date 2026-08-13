import { useMemo, useState } from 'react'
import {
  Bell,
  CaretLeft,
  ChatCircle,
  Check,
  DotsThree,
  House,
  List,
  MagnifyingGlass,
  MessengerLogo,
  ShareFat,
  ThumbsUp,
  Users,
  VideoCamera,
} from '@phosphor-icons/react'
import salaminLogo from '../assets/logo-white-bg-transparent.png'
import bbmImage from '../assets/posts-2-sides/bbm-vs-leni/Project SALAMIN - Brand & Post Assets (6).png'
import leniBbmImage from '../assets/posts-2-sides/bbm-vs-leni/Project SALAMIN - Brand & Post Assets (7).png'
import leniSaraImage from '../assets/posts-2-sides/leni-vs-sara/Project SALAMIN - Brand & Post Assets (2).png'
import saraImage from '../assets/posts-2-sides/leni-vs-sara/Project SALAMIN - Brand & Post Assets (3).png'
import incImage from '../assets/posts-2-sides/inc-vs-neutral/Project SALAMIN - Brand & Post Assets (4).png'
import civicImage from '../assets/posts-2-sides/inc-vs-neutral/Project SALAMIN - Brand & Post Assets (5).png'
import neutralFloodImage from '../assets/posts-2-sides/neutral-fc-vs-bbm-fc/Project SALAMIN - Brand & Post Assets (8).png'
import bbmFloodImage from '../assets/posts-2-sides/neutral-fc-vs-bbm-fc/Project SALAMIN - Brand & Post Assets (9).png'
import './App.css'

type Affinity = 'bbm' | 'leni' | 'sara' | 'religious' | 'independent' | 'private'
type Reaction = 'believe' | 'check' | 'share' | 'doubt'
type Reflection = 'more-belief' | 'more-doubt' | 'same' | 'unsure'
type Step =
  | 'intro'
  | 'profile'
  | 'post-one'
  | 'post-two'
  | 'reveal'
  | 'reflection'
  | 'lesson'
  | 'consent'
  | 'done'

type PairId = 'bbm-leni' | 'leni-sara' | 'inc-neutral' | 'neutral-bbm-flood'
type VariantId = 'bbm' | 'leni-bbm' | 'leni-sara' | 'sara' | 'inc' | 'civic' | 'neutral-flood' | 'bbm-flood'

type PostVariant = {
  id: VariantId
  identity: string
  image: string
  alt: string
}

type PostPair = {
  id: PairId
  caption: string
  kicker: string
  headline: string
  variants: [PostVariant, PostVariant]
}

const reactionLabels: Record<Reaction, string> = {
  believe: 'Maniniwala ako',
  check: 'Iche-check ko muna',
  share: 'Isha-share ko',
  doubt: 'May duda ako',
}

const affinityLabels: Record<Affinity, string> = {
  bbm: 'Bongbong Marcos',
  leni: 'Leni Robredo',
  sara: 'Sara Duterte',
  religious: 'Religious-group endorsements',
  independent: 'Independent / walang sinusundang side',
  private: 'Secret muna',
}

const postPairs: Record<PairId, PostPair> = {
  'bbm-leni': {
    id: 'bbm-leni',
    caption: 'Malaking pangako para sa susunod na administrasyon. Posible kaya?',
    kicker: 'ONE YEAR LANG?',
    headline: 'Presidential candidate vows to end the economic crisis within the first year in office.',
    variants: [
      { id: 'bbm', identity: 'Bongbong Marcos', image: bbmImage, alt: 'Presidential candidate greeting a crowd of supporters' },
      { id: 'leni-bbm', identity: 'Leni Robredo', image: leniBbmImage, alt: 'Presidential candidate greeting supporters during a rally' },
    ],
  },
  'leni-sara': {
    id: 'leni-sara',
    caption: 'Malaking pangako para sa susunod na administrasyon. Posible kaya?',
    kicker: 'ONE YEAR LANG?',
    headline: 'Presidential candidate vows to end the economic crisis within the first year in office.',
    variants: [
      { id: 'leni-sara', identity: 'Leni Robredo', image: leniSaraImage, alt: 'Presidential candidate speaking in front of news microphones' },
      { id: 'sara', identity: 'Sara Duterte', image: saraImage, alt: 'Presidential candidate waving outdoors' },
    ],
  },
  'inc-neutral': {
    id: 'inc-neutral',
    caption: 'Malaking pwersa raw sa susunod na halalan. Gaano kalaki ang epekto nito?',
    kicker: 'ONE MILLION VOTES?',
    headline: 'Political group claims it can influence the outcome of the next national election.',
    variants: [
      { id: 'inc', identity: 'INC-aligned crowd', image: incImage, alt: 'Large political gathering filling a major road' },
      { id: 'civic', identity: 'Non-aligned civic group', image: civicImage, alt: 'Civic group holding signs during a public demonstration' },
    ],
  },
  'neutral-bbm-flood': {
    id: 'neutral-bbm-flood',
    caption: 'May bagong pangako para sa flood control. Posible kaya sa loob ng isang taon?',
    kicker: 'FLOOD-FREE IN ONE YEAR?',
    headline: 'Government team vows to solve major flood-control problems nationwide.',
    variants: [
      { id: 'neutral-flood', identity: 'Neutral flood-control coverage', image: neutralFloodImage, alt: 'Officials inspecting a waterway and flood-control site' },
      { id: 'bbm-flood', identity: 'BBM-linked flood-control coverage', image: bbmFloodImage, alt: 'Public official inspecting a flood-control site' },
    ],
  },
}

const getVariant = (pair: PostPair, id: VariantId) => pair.variants.find((variant) => variant.id === id) ?? pair.variants[0]

function FacebookHeader({ showBack = false }: { showBack?: boolean }) {
  return (
    <header className="fb-header">
      <div className="fb-header__brand">
        {showBack ? (
          <button className="icon-button icon-button--plain" type="button" aria-label="Bumalik">
            <CaretLeft size={25} weight="bold" />
          </button>
        ) : (
          <span className="facebook-wordmark">facebook</span>
        )}
      </div>
      <label className="fb-search">
        <MagnifyingGlass size={20} aria-hidden="true" />
        <span className="sr-only">Search Facebook</span>
        <input aria-label="Search Facebook" placeholder="Search Facebook" readOnly />
      </label>
      <nav className="fb-tabs" aria-label="Facebook navigation preview">
        <button className="fb-tab fb-tab--active" type="button" aria-label="Home">
          <House size={28} weight="fill" />
        </button>
        <button className="fb-tab" type="button" aria-label="Video">
          <VideoCamera size={28} />
        </button>
        <button className="fb-tab" type="button" aria-label="Friends">
          <Users size={28} />
        </button>
      </nav>
      <div className="fb-actions">
        <button className="icon-button" type="button" aria-label="Menu">
          <List size={22} weight="bold" />
        </button>
        <button className="icon-button" type="button" aria-label="Messenger">
          <MessengerLogo size={22} weight="fill" />
        </button>
        <button className="icon-button" type="button" aria-label="Notifications">
          <Bell size={22} weight="fill" />
        </button>
        <span className="profile-avatar" aria-hidden="true">IK</span>
      </div>
    </header>
  )
}

function FeedShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="facebook-app">
      <FacebookHeader />
      <div className="fb-layout">
        <aside className="fb-rail fb-rail--left" aria-hidden="true">
          <div className="rail-person"><span className="profile-avatar">IK</span><strong>Ikaw</strong></div>
          <div><Users size={27} weight="fill" /> Friends</div>
          <div><VideoCamera size={27} weight="fill" /> Video</div>
          <div><MessengerLogo size={27} weight="fill" /> Messenger</div>
        </aside>
        <main className="feed-column">{children}</main>
        <aside className="fb-rail fb-rail--right" aria-hidden="true">
          <p>Contacts</p>
          <div><span className="contact-avatar contact-avatar--one">AM</span> Ana Mendoza</div>
          <div><span className="contact-avatar contact-avatar--two">JR</span> Jun Reyes</div>
          <div><span className="contact-avatar contact-avatar--three">CL</span> Carlo Lim</div>
        </aside>
      </div>
    </div>
  )
}

function StoriesStrip() {
  return (
    <div className="stories" aria-hidden="true">
      <div className="story story--create"><span>+</span><small>Create story</small></div>
      <div className="story story--one"><span>AM</span><small>Ana</small></div>
      <div className="story story--two"><span>JR</span><small>Jun</small></div>
      <div className="story story--three"><span>CL</span><small>Carlo</small></div>
    </div>
  )
}

function IntroCard({ onStart }: { onStart: () => void }) {
  return (
    <>
      <StoriesStrip />
      <article className="feed-card intro-card">
        <div className="intro-card__mark">?</div>
        <p className="intro-card__kicker">Quick reaction check</p>
        <h1>May dalawang post sa feed mo.</h1>
        <p className="intro-card__body">
          Sagutin mo base sa una mong reaction. Wala pang isang minuto.
        </p>
        <button className="primary-button" type="button" onClick={onStart}>Game</button>
        <p className="intro-card__note">
          Fictional ang posts sa activity na ito. Hindi ito totoong balita.
        </p>
      </article>
    </>
  )
}

function ProfilePicker({ onPick }: { onPick: (affinity: Affinity) => void }) {
  const choices: Affinity[] = ['bbm', 'leni', 'sara', 'religious', 'independent', 'private']
  return (
    <article className="feed-card question-card">
      <div className="post-author">
        <div className="neutral-avatar">?</div>
        <div><strong>Quick check</strong><span>Only you can see this</span></div>
        <DotsThree size={24} aria-hidden="true" />
      </div>
      <div className="question-card__content">
        <p className="question-count">Quick setup</p>
        <h1>Sa usapang politika, alin ang pinakamalapit sa iyo ngayon?</h1>
        <p>Piliin ang pinakamalapit. Puwede ring hindi sabihin.</p>
        <div className="choice-grid choice-grid--profile">
          {choices.map((choice) => (
            <button key={choice} type="button" onClick={() => onPick(choice)}>
              {affinityLabels[choice]}
            </button>
          ))}
        </div>
      </div>
    </article>
  )
}

function PoliticalPost({ pair, variant }: { pair: PostPair; variant: PostVariant }) {
  return (
    <article className="feed-card political-post">
      <div className="post-author">
        <div className="page-avatar page-avatar--news">BB</div>
        <div>
          <strong>Balitang Bayan</strong>
          <span>Sponsored · <span aria-label="Public post">◉</span></span>
        </div>
        <DotsThree size={25} aria-hidden="true" />
      </div>
      <p className="post-copy">{pair.caption}</p>
      <div className="news-visual">
        <img src={variant.image} alt={variant.alt} />
        <div className="news-visual__headline">
          <span>{pair.kicker}</span>
          <strong>{pair.headline}</strong>
        </div>
      </div>
      <div className="engagement-counts">
        <span><span className="reaction-bubble">f</span> 1.9K</span>
        <span>327 comments · 62 shares</span>
      </div>
      <div className="post-actions" aria-hidden="true">
        <span><ThumbsUp size={21} /> Like</span>
        <span><ChatCircle size={21} /> Comment</span>
        <span><ShareFat size={21} /> Share</span>
      </div>
    </article>
  )
}

function ReactionPanel({
  number,
  onChoose,
}: {
  number: 1 | 2
  onChoose: (reaction: Reaction) => void
}) {
  const reactions: Reaction[] = ['believe', 'check', 'share', 'doubt']
  return (
    <section className="reaction-panel" aria-labelledby="reaction-title">
      <p>{number === 1 ? 'Lumabas ito sa feed mo.' : 'May isa pang post.'}</p>
      <h2 id="reaction-title">Ano ang una mong reaction?</h2>
      <div className="choice-grid">
        {reactions.map((reaction) => (
          <button key={reaction} type="button" onClick={() => onChoose(reaction)}>
            {reactionLabels[reaction]}
          </button>
        ))}
      </div>
    </section>
  )
}

function RevealPost({ pair, variant, answer }: { pair: PostPair; variant: PostVariant; answer: Reaction }) {
  return (
    <div className="reveal-post">
      <div className="reveal-post__author">
        <img src={variant.image} alt={variant.alt} />
        <strong>{variant.identity}</strong>
      </div>
      <p><mark>{pair.kicker}</mark> {pair.headline}</p>
      <span className="answer-chip"><Check size={16} weight="bold" /> {reactionLabels[answer]}</span>
    </div>
  )
}

function RevealScreen({
  pair,
  order,
  answers,
  onContinue,
}: {
  pair: PostPair
  order: VariantId[]
  answers: Reaction[]
  onContinue: () => void
}) {
  return (
    <div className="reveal-screen screen-enter">
      <header className="reveal-header">
        <img src={salaminLogo} alt="Project Salamin" />
      </header>
      <main className="reveal-content">
        <p className="reveal-kicker">May hindi kami sinabi sa simula.</p>
        <h1>Pareho ang claim.</h1>
        <p className="reveal-lead">
          Pareho ring walang source o sapat na patunay. Ang panig lang ang pinalitan namin.
        </p>
        <div className="reveal-comparison">
          <RevealPost pair={pair} variant={getVariant(pair, order[0])} answer={answers[0]} />
          <RevealPost pair={pair} variant={getVariant(pair, order[1])} answer={answers[1]} />
        </div>
        <p className="reveal-explanation">
          Sinabi namin ito pagkatapos mong sumagot para makuha ang una mong reaction.
        </p>
        <button className="primary-button primary-button--light" type="button" onClick={onContinue}>
          Tingnan ang sagot ko
        </button>
      </main>
    </div>
  )
}

function ReflectionScreen({
  answers,
  onChoose,
}: {
  answers: Reaction[]
  onChoose: (reflection: Reflection) => void
}) {
  const same = answers[0] === answers[1]
  return (
    <div className="salamin-page screen-enter">
      <header className="salamin-header">
        <img src={salaminLogo} alt="Project Salamin" />
      </header>
      <main className="salamin-content">
        <p className="page-kicker">Balikan natin</p>
        <h1>{same ? 'Pareho ang sagot mo.' : 'Magkaiba ang sagot mo.'}</h1>
        <p className="page-lead">
          {same
            ? 'Tingnan natin kung pareho rin ang patunay na hahanapin mo.'
            : 'Ikaw lang ang makakapagsabi kung ano ang nakaapekto sa sagot mo.'}
        </p>
        <fieldset className="reflection-options">
          <legend>Ano ang napansin mo?</legend>
          <button type="button" onClick={() => onChoose('more-belief')}>Mas naniwala ako sa isang panig</button>
          <button type="button" onClick={() => onChoose('more-doubt')}>Mas nagduda ako sa isang panig</button>
          <button type="button" onClick={() => onChoose('same')}>Pareho ang naging tingin ko</button>
          <button type="button" onClick={() => onChoose('unsure')}>Hindi ako sure</button>
        </fieldset>
      </main>
    </div>
  )
}

function LessonScreen({ onContinue }: { onContinue: () => void }) {
  const checks = [
    ['01', 'Sino ang original source?'],
    ['02', 'Ano ang patunay?'],
    ['03', 'May kulang bang context?'],
    ['04', 'Pareho ba ang tanong ko kung ibang panig ang nag-post?'],
  ]
  return (
    <div className="salamin-page screen-enter">
      <header className="salamin-header">
        <img src={salaminLogo} alt="Project Salamin" />
      </header>
      <main className="salamin-content salamin-content--lesson">
        <p className="page-kicker">SALAMIN Check</p>
        <h1>Bago maniwala o mag-share, apat na tanong muna.</h1>
        <div className="check-list">
          {checks.map(([number, label]) => (
            <div key={number} className="check-item">
              <span>{number}</span>
              <strong>{label}</strong>
            </div>
          ))}
        </div>
        <button className="primary-button primary-button--light" type="button" onClick={onContinue}>Gets ko</button>
      </main>
    </div>
  )
}

function ConsentScreen({ onAnswer }: { onAnswer: (keep: boolean) => void }) {
  return (
    <div className="salamin-page salamin-page--light screen-enter">
      <header className="salamin-header salamin-header--light">
        <img src={salaminLogo} alt="Project Salamin" />
      </header>
      <main className="salamin-content consent-content">
        <div className="consent-icon"><Check size={34} weight="bold" /></div>
        <p className="page-kicker">Last question</p>
        <h1>Okay lang bang isama ang sagot mo?</h1>
        <p className="page-lead">
          Sa demo na ito, sa device mo lang mase-save ang sagot. Wala kaming kukuning pangalan o Facebook account.
        </p>
        <div className="consent-actions">
          <button className="primary-button" type="button" onClick={() => onAnswer(true)}>Oo, isama</button>
          <button className="text-button" type="button" onClick={() => onAnswer(false)}>Hindi, burahin</button>
        </div>
      </main>
    </div>
  )
}

function DoneScreen({ kept, onRestart }: { kept: boolean; onRestart: () => void }) {
  return (
    <div className="salamin-page screen-enter">
      <header className="salamin-header">
        <img src={salaminLogo} alt="Project Salamin" />
      </header>
      <main className="salamin-content done-content">
        <p className="page-kicker">Tapos na</p>
        <h1>Kahit sino pa ang sangkot, pareho dapat ang pag-check.</h1>
        <p className="page-lead">
          {kept
            ? 'Salamat. Sinave namin ang anonymous answers mo sa device na ito.'
            : 'Hindi namin sinave ang mga sagot mo.'}
        </p>
        <div className="closing-line">
          <span>Kilatisin ang nakikita.</span>
          <strong>Hanapin ang patunay.</strong>
        </div>
        <button className="primary-button primary-button--light" type="button" onClick={onRestart}>Ulitin</button>
      </main>
    </div>
  )
}

function App() {
  const [step, setStep] = useState<Step>('intro')
  const [affinity, setAffinity] = useState<Affinity | null>(null)
  const [answers, setAnswers] = useState<Reaction[]>([])
  const [reflection, setReflection] = useState<Reflection | null>(null)
  const [kept, setKept] = useState(false)

  const route = useMemo<{ pairId: PairId; order: VariantId[] }>(() => {
    if (affinity === 'bbm') return { pairId: 'bbm-leni', order: ['bbm', 'leni-bbm'] }
    if (affinity === 'leni') {
      return Math.random() > 0.5
        ? { pairId: 'bbm-leni', order: ['leni-bbm', 'bbm'] }
        : { pairId: 'leni-sara', order: ['leni-sara', 'sara'] }
    }
    if (affinity === 'sara') return { pairId: 'leni-sara', order: ['sara', 'leni-sara'] }
    if (affinity === 'religious') return { pairId: 'inc-neutral', order: ['inc', 'civic'] }
    if (affinity === 'independent') return { pairId: 'neutral-bbm-flood', order: ['neutral-flood', 'bbm-flood'] }

    const routes: { pairId: PairId; order: VariantId[] }[] = [
      { pairId: 'bbm-leni', order: ['bbm', 'leni-bbm'] },
      { pairId: 'leni-sara', order: ['sara', 'leni-sara'] },
      { pairId: 'inc-neutral', order: ['inc', 'civic'] },
      { pairId: 'neutral-bbm-flood', order: ['neutral-flood', 'bbm-flood'] },
    ]
    const selected = routes[Math.floor(Math.random() * routes.length)]
    return Math.random() > 0.5
      ? selected
      : { ...selected, order: [...selected.order].reverse() }
  }, [affinity])

  const activePair = postPairs[route.pairId]

  const restart = () => {
    setStep('intro')
    setAffinity(null)
    setAnswers([])
    setReflection(null)
    setKept(false)
  }

  const chooseReaction = (reaction: Reaction) => {
    if (step === 'post-one') {
      setAnswers([reaction])
      setStep('post-two')
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    setAnswers((current) => [...current, reaction])
    setStep('reveal')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const finishConsent = (keep: boolean) => {
    if (keep) {
      const response = {
        affinity,
        pairId: route.pairId,
        postOrder: route.order,
        answers,
        reflection,
        completedAt: new Date().toISOString(),
      }

      try {
        const saved = JSON.parse(localStorage.getItem('salamin-responses') ?? '[]')
        const responses = Array.isArray(saved) ? saved : []
        localStorage.setItem('salamin-responses', JSON.stringify([...responses, response]))
      } catch {
        localStorage.setItem('salamin-responses', JSON.stringify([response]))
      }
    }

    setKept(keep)
    setStep('done')
  }

  if (step === 'reveal') {
    return <RevealScreen pair={activePair} order={route.order} answers={answers} onContinue={() => setStep('reflection')} />
  }

  if (step === 'reflection') {
    return (
      <ReflectionScreen
        answers={answers}
        onChoose={(value) => {
          setReflection(value)
          setStep('lesson')
        }}
      />
    )
  }

  if (step === 'lesson') return <LessonScreen onContinue={() => setStep('consent')} />

  if (step === 'consent') {
    return <ConsentScreen onAnswer={finishConsent} />
  }

  if (step === 'done') return <DoneScreen kept={kept} onRestart={restart} />

  return (
    <FeedShell>
      {step === 'intro' && <IntroCard onStart={() => setStep('profile')} />}
      {step === 'profile' && (
        <ProfilePicker
          onPick={(value) => {
            setAffinity(value)
            setStep('post-one')
          }}
        />
      )}
      {(step === 'post-one' || step === 'post-two') && (
        <div className="post-flow screen-enter">
          <PoliticalPost
            pair={activePair}
            variant={getVariant(activePair, step === 'post-one' ? route.order[0] : route.order[1])}
          />
          <ReactionPanel number={step === 'post-one' ? 1 : 2} onChoose={chooseReaction} />
        </div>
      )}
    </FeedShell>
  )
}

export default App
