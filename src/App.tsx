import { useEffect, useMemo, useState } from 'react'
import {
  Bell,
  CaretLeft,
  CaretRight,
  ChatCircle,
  Check,
  CheckCircle,
  DotsThree,
  House,
  List,
  LinkSimple,
  MagnifyingGlass,
  MessengerLogo,
  ShareFat,
  ThumbsUp,
  UserCircle,
  Users,
  VideoCamera,
} from '@phosphor-icons/react'
import salaminLogo from '../assets/logo-white-bg-transparent.png'
import leniCandidacyImage from '../assets/posts-2-sides/leni-vs-sara/Project SALAMIN - Brand & Post Assets (2).png'
import saraCandidacyImage from '../assets/posts-2-sides/leni-vs-sara/Project SALAMIN - Brand & Post Assets (3).png'
import leniFloodImage from '../assets/posts-2-sides/leni-vs-sara/leni.jpg'
import saraFloodImage from '../assets/posts-2-sides/leni-vs-sara/sara.jpg'
import { RadioGroup, RadioGroupItem } from './components/ui/radio-group'
import { submitSalaminResponse } from './salamin-api'
import './App.css'

type Affinity = 'leni' | 'sara'
type Reaction = 'believe' | 'check' | 'share' | 'doubt'
type Reflection = 'more-belief' | 'more-doubt' | 'same' | 'unsure'
type Step =
  | 'intro'
  | 'side'
  | 'posts'
  | 'reveal'
  | 'lesson'
  | 'consent'
  | 'done'

type CheckAction = 'profile' | 'comments' | 'links'

type PairId = 'presidential-candidacy' | 'flood-control'
type VariantId = 'leni-candidacy' | 'sara-candidacy' | 'leni-frame' | 'dds-frame'

type FeedPost = {
  pairId: PairId
  variantId: VariantId
}

type PostVariant = {
  id: VariantId
  identity: string
  image: string
  alt: string
  kicker: string
  headline: string
  headlineHighlight?: string
}

type PostPair = {
  id: PairId
  title: string
  caption: string
  revealNote: string
  variants: [PostVariant, PostVariant]
}

const reactionLabels: Record<Reaction, string> = {
  believe: 'Maniniwala ako',
  check: 'Iche-check ko muna',
  share: 'Isha-share ko',
  doubt: 'May duda ako',
}

const affinityLabels: Record<Affinity, string> = {
  leni: 'Leni Robredo',
  sara: 'Sara Duterte',
}

const postPairs: Record<PairId, PostPair> = {
  'presidential-candidacy': {
    id: 'presidential-candidacy',
    title: 'Presidential candidacy',
    caption: 'Malaking pangako para sa susunod na administrasyon. Posible kaya?',
    revealNote: 'Pareho ang claim. Kandidato lang ang pinalitan.',
    variants: [
      {
        id: 'leni-candidacy',
        identity: 'Leni Robredo',
        image: leniCandidacyImage,
        alt: 'Leni Robredo speaking in front of news microphones',
        kicker: 'ONE YEAR LANG?',
        headline: 'Presidential candidate vows to end the economic crisis within the first year in office.',
      },
      {
        id: 'sara-candidacy',
        identity: 'Sara Duterte',
        image: saraCandidacyImage,
        alt: 'Sara Duterte waving outdoors',
        kicker: 'ONE YEAR LANG?',
        headline: 'Presidential candidate vows to end the economic crisis within the first year in office.',
      },
    ],
  },
  'flood-control': {
    id: 'flood-control',
    title: 'Flood control',
    caption: 'Baha na naman. Kaninong flood-control plan ang may malinaw na sagot?',
    revealNote: 'Pareho ang puna. Politiko lang ang pinalitan.',
    variants: [
      {
        id: 'leni-frame',
        identity: 'Leni-aligned framing',
        image: saraFloodImage,
        alt: 'Sara Duterte speaking during an on-location interview',
        kicker: 'PURO PANGAKO LANG?',
        headline: 'Sara Duterte’s flood-control proposal called vague, unfunded, and impossible to execute.',
        headlineHighlight: 'Sara Duterte’s',
      },
    {
      id: 'dds-frame',
      identity: 'DDS-aligned framing',
      image: leniFloodImage,
      alt: 'Leni Robredo visiting a flooded building',
      kicker: 'PURO PANGAKO LANG?',
      headline: 'Robredo’s flood-control proposal called vague, unfunded, and impossible to execute.',
      headlineHighlight: 'Robredo’s',
    },
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
        <h1>May apat na post sa feed mo.</h1>
        <p className="intro-card__body">
          Sagutin mo base sa una mong reaction. Wala pang dalawang minuto.
        </p>
        <button className="primary-button" type="button" onClick={onStart}>Game</button>
        <p className="intro-card__note">
          Fictional ang posts sa activity na ito. Hindi ito totoong balita.
        </p>
      </article>
    </>
  )
}

function SetupCard({ children }: { children: React.ReactNode }) {
  return (
    <article className="feed-card question-card">
      <div className="post-author">
        <div className="neutral-avatar">?</div>
        <div><strong>Quick check</strong><span>Only you can see this</span></div>
        <DotsThree size={24} aria-hidden="true" />
      </div>
      {children}
    </article>
  )
}

function SidePicker({ onPick }: { onPick: (affinity: Affinity) => void }) {
  const choices: Affinity[] = ['leni', 'sara']

  return (
    <SetupCard>
      <div className="question-card__content setup-screen">
        <p className="question-count">Quick setup</p>
        <h1>Aling panig ang mas malapit sa iyo?</h1>
        <p>Piliin ang mas malapit sa pananaw mo ngayon.</p>
        <div className="side-choices">
          {choices.map((choice) => (
            <button key={choice} type="button" onClick={() => onPick(choice)}>
              <span className="side-choice__initials" aria-hidden="true">
                {choice === 'leni' ? 'LR' : 'SD'}
              </span>
              <span>
                <small>Mas malapit ako kay</small>
                <strong>{affinityLabels[choice]}</strong>
              </span>
              <CaretRight size={26} weight="bold" aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>
    </SetupCard>
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
          <span>{variant.kicker}</span>
          <strong>{variant.headline}</strong>
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
  total,
  onChoose,
}: {
  number: number
  total: number
  onChoose: (reaction: Reaction) => void
}) {
  const reactions: Reaction[] = ['believe', 'check', 'share', 'doubt']
  const [selectedReaction, setSelectedReaction] = useState<Reaction | null>(null)

  const confirmReaction = () => {
    if (selectedReaction) onChoose(selectedReaction)
  }

  return (
    <section className="reaction-panel" aria-labelledby="reaction-title">
      <div className="reaction-panel__inner">
        <div className="reaction-panel__prompt">
          <p>Post {number} sa {total}</p>
          <h2 id="reaction-title">Ano ang una mong reaction?</h2>
        </div>
        <RadioGroup
          aria-labelledby="reaction-title"
          className="reaction-options"
          value={selectedReaction ?? undefined}
          onValueChange={(value) => setSelectedReaction(value as Reaction)}
        >
          {reactions.map((reaction) => (
            <label
              className={selectedReaction === reaction ? 'reaction-option reaction-option--selected' : 'reaction-option'}
              htmlFor={`reaction-${reaction}`}
              key={reaction}
            >
              <RadioGroupItem id={`reaction-${reaction}`} value={reaction} />
              <span>{reactionLabels[reaction]}</span>
            </label>
          ))}
        </RadioGroup>
        <button
          className="primary-button reaction-confirm"
          type="button"
          disabled={!selectedReaction}
          onClick={confirmReaction}
        >
          CONFIRM
        </button>
      </div>
    </section>
  )
}

function RevealPost({ variant, answer, number }: { variant: PostVariant; answer: Reaction; number: number }) {
  const highlightedHeadline = variant.headlineHighlight
    ? (() => {
        const start = variant.headline.indexOf(variant.headlineHighlight)

        if (start === -1) return variant.headline

        const end = start + variant.headlineHighlight.length
        return (
          <>
            {variant.headline.slice(0, start)}
            <mark>{variant.headline.slice(start, end)}</mark>
            {variant.headline.slice(end)}
          </>
        )
      })()
    : variant.headline

  return (
    <div className="reveal-post">
      <div className="reveal-post__author">
        <img src={variant.image} alt={variant.alt} />
        <div>
          <span>Post {number}</span>
          <strong>{variant.headlineHighlight ? variant.identity : <mark>{variant.identity}</mark>}</strong>
        </div>
      </div>
      <p><strong>{variant.kicker}</strong> {highlightedHeadline}</p>
      <span className="answer-chip"><Check size={16} weight="bold" /> Sagot mo: {reactionLabels[answer]}</span>
    </div>
  )
}

function RevealScreen({
  posts,
  answers,
  onChoose,
}: {
  posts: FeedPost[]
  answers: Reaction[]
  onChoose: (reflection: Reflection) => void
}) {
  const comparisons = (Object.keys(postPairs) as PairId[]).map((pairId) => ({
    pair: postPairs[pairId],
    entries: posts
      .map((post, index) => ({ post, index }))
      .filter(({ post }) => post.pairId === pairId),
  }))

  return (
    <div className="reveal-screen screen-enter">
      <header className="reveal-header">
        <img src={salaminLogo} alt="Project Salamin" />
      </header>
      <main className="reveal-content">
        <p className="reveal-kicker">Ito ang hindi namin sinabi sa simula</p>
        <h1>Inuna namin ang panig na pinili mo.</h1>
        <p className="reveal-lead">
          Nakita mo muna ang dalawang post na tugma sa pinili mong panig. Sumunod ang dalawang post mula sa kabilang panig.
        </p>
        <div className="reveal-issues">
          {comparisons.map(({ pair, entries }) => (
            <section className="reveal-issue" key={pair.id}>
              <h2>{pair.title}</h2>
              <p>{pair.revealNote}</p>
              <div className="reveal-comparison">
                {entries.map(({ post, index }) => (
                  <RevealPost
                    key={`${post.pairId}-${post.variantId}`}
                    variant={getVariant(pair, post.variantId)}
                    answer={answers[index]}
                    number={index + 1}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
        <fieldset className="reflection-options reflection-options--merged">
          <legend>Nagbago ba ang reaction mo nang lumipat sa kabilang panig?</legend>
          <button type="button" onClick={() => onChoose('more-belief')}>Mas naniwala ako sa isang panig</button>
          <button type="button" onClick={() => onChoose('more-doubt')}>Mas nagduda ako sa isang panig</button>
          <button type="button" onClick={() => onChoose('same')}>Pareho ang naging tingin ko</button>
          <button type="button" onClick={() => onChoose('unsure')}>Hindi ako sigurado</button>
        </fieldset>
      </main>
    </div>
  )
}

function CheckPost({
  pair,
  variant,
  completed,
  onCheck,
}: {
  pair: PostPair
  variant: PostVariant
  completed: CheckAction[]
  onCheck: (action: CheckAction) => void
}) {
  const isDone = (action: CheckAction) => completed.includes(action)

  return (
    <article className="check-post" aria-label={`Post tungkol kay ${variant.identity}`}>
      <div className="check-post__label">Pindutin ang mga bahagi ng post para magsuri</div>
      <div className="check-post__author">
        <button
          className={isDone('profile') ? 'post-check-target post-check-target--profile is-done' : 'post-check-target post-check-target--profile'}
          type="button"
          disabled={isDone('profile')}
          onClick={() => onCheck('profile')}
        >
          <span className="page-avatar page-avatar--news">BB</span>
          <span>
            <strong>Balitang Bayan</strong>
            <small>Tingnan ang profile</small>
          </span>
          {isDone('profile') && <CheckCircle size={20} weight="fill" aria-hidden="true" />}
        </button>
        <DotsThree size={24} aria-hidden="true" />
      </div>
      <p className="check-post__caption">{pair.caption}</p>
      <button
        className={isDone('links') ? 'check-post__visual post-check-target is-done' : 'check-post__visual post-check-target'}
        type="button"
        disabled={isDone('links')}
        onClick={() => onCheck('links')}
        aria-label="Buksan at suriin ang link ng post"
      >
        <img src={variant.image} alt={variant.alt} />
        <div>
          <span>{variant.kicker}</span>
          <strong>{variant.headline}</strong>
        </div>
        <span className="post-target-hint">
          {isDone('links') ? <><CheckCircle size={18} weight="fill" /> Link nasuri</> : 'Buksan ang link'}
        </span>
      </button>
      <div className="check-post__engagement">
        <span>1.9K reactions</span>
        <button
          className={isDone('comments') ? 'post-check-target post-check-target--comments is-done' : 'post-check-target post-check-target--comments'}
          type="button"
          disabled={isDone('comments')}
          onClick={() => onCheck('comments')}
        >
          {isDone('comments') && <CheckCircle size={17} weight="fill" aria-hidden="true" />}
          327 comments, 62 shares
        </button>
      </div>
    </article>
  )
}

function LessonScreen({ pair, variant, onContinue }: { pair: PostPair; variant: PostVariant; onContinue: () => void }) {
  const [completed, setCompleted] = useState<CheckAction[]>([])
  const [toast, setToast] = useState<{ title: string; description: string } | null>(null)

  const checks: Array<{
    id: CheckAction
    label: string
    hint: string
    finding: string
    icon: React.ReactNode
  }> = [
    {
      id: 'profile',
      label: 'Tingnan ang profile',
      hint: 'Kilalanin kung sino ang nasa likod ng page.',
      finding: 'Walang malinaw na impormasyon kung sino ang nagpapatakbo ng page.',
      icon: <UserCircle size={28} weight="bold" aria-hidden="true" />,
    },
    {
      id: 'comments',
      label: 'Basahin ang comments',
      hint: 'Tingnan kung may nagbigay ng totoong patunay.',
      finding: 'May mga opinyon at reaction, pero walang ebidensiyang pinakita.',
      icon: <ChatCircle size={27} weight="bold" aria-hidden="true" />,
    },
    {
      id: 'links',
      label: 'Hanapin ang link o dokumento',
      hint: 'Maghanap ng report, video, o opisyal na pahayag.',
      finding: 'Walang link sa report, buong speech, o opisyal na dokumento.',
      icon: <LinkSimple size={27} weight="bold" aria-hidden="true" />,
    },
  ]

  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(() => setToast(null), 4200)
    return () => window.clearTimeout(timer)
  }, [toast])

  const runCheck = (action: CheckAction) => {
    if (completed.includes(action)) return
    const check = checks.find((item) => item.id === action)
    if (!check) return
    setCompleted((current) => [...current, action])
    setToast({ title: `${check.label}: tapos na`, description: check.finding })
  }

  const allDone = completed.length === checks.length

  return (
    <div className="facebook-app check-experience screen-enter">
      <FacebookHeader />
      <main className="check-facebook-layout">
        <aside className="fb-rail fb-rail--left check-fb-nav" aria-hidden="true">
          <div className="rail-person"><span className="profile-avatar">IK</span><strong>Ikaw</strong></div>
          <div><Users size={27} weight="fill" /> Friends</div>
          <div><VideoCamera size={27} weight="fill" /> Video</div>
          <div><MessengerLogo size={27} weight="fill" /> Messenger</div>
        </aside>
        <section className="check-feed" aria-label="Post na susuriin">
          <CheckPost pair={pair} variant={variant} completed={completed} onCheck={runCheck} />
        </section>
        <aside className="lesson-checks check-sidebar" aria-label="Mga kailangang suriin">
          <p className="check-sidebar__kicker">SALAMIN CHECK</p>
          <h1>Ikaw naman ang mag-check.</h1>
          <p className="check-sidebar__lead">Sa post mismo pindutin ang profile, link, at comments.</p>
          <div className="check-status" aria-live="polite">
            <strong>{completed.length} sa {checks.length} nasuri</strong>
            <span>{allDone ? 'Kumpleto na.' : 'Kahit anong ayos.'}</span>
          </div>
          <div className="check-actions" aria-label="SALAMIN CHECK progress">
            {checks.map((check) => {
              const isDone = completed.includes(check.id)
              return (
                <div
                  key={check.id}
                  className={isDone ? 'check-action check-action--done' : 'check-action'}
                >
                  <span className="check-action__icon">
                    {isDone ? <CheckCircle size={25} weight="fill" aria-hidden="true" /> : check.icon}
                  </span>
                  <span className="check-action__copy">
                    <strong>{check.label}</strong>
                    <small>{isDone ? check.finding : check.hint}</small>
                  </span>
                  <span className="check-action__state">{isDone ? 'Tapos na' : 'Hanapin sa post'}</span>
                </div>
              )
            })}
          </div>
          <div className="research-reminder">
            <MagnifyingGlass size={25} weight="bold" aria-hidden="true" />
            <div>
              <strong>Huwag sa post lang.</strong>
              <p>Mag-search din at ikumpara sa ibang mapagkakatiwalaang source.</p>
            </div>
          </div>
          <button
            className="primary-button lesson-continue"
            type="button"
            disabled={!allDone}
            onClick={onContinue}
          >
            {allDone ? 'Magpatuloy' : `Tapusin pa ang ${checks.length - completed.length}`}
          </button>
        </aside>
      </main>
      <div className="toast-viewport" aria-live="polite" aria-atomic="true">
        {toast && (
          <div className="salamin-toast" role="status" key={toast.title}>
            <CheckCircle size={22} weight="fill" aria-hidden="true" />
            <div>
              <strong>{toast.title}</strong>
              <p>{toast.description}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function ConsentScreen({
  onAnswer,
  saving,
  error,
}: {
  onAnswer: (keep: boolean) => void
  saving: boolean
  error: string | null
}) {
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
          Ise-save namin ang anonymous answers mo para sa pilot results. Wala kaming kukuning pangalan o Facebook account.
        </p>
        {error && <p role="alert">{error}</p>}
        <div className="consent-actions">
          <button className="primary-button" type="button" disabled={saving} onClick={() => onAnswer(true)}>
            {saving ? 'Sine-save…' : 'Oo, isama'}
          </button>
          <button className="text-button" type="button" disabled={saving} onClick={() => onAnswer(false)}>Hindi, burahin</button>
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
            ? 'Salamat. Kasama na ang anonymous answers mo sa pilot results.'
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
  const [postIndex, setPostIndex] = useState(0)
  const [reflection, setReflection] = useState<Reflection | null>(null)
  const [kept, setKept] = useState(false)
  const [startedAt, setStartedAt] = useState<number | null>(null)
  const [submissionId, setSubmissionId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)

  const route = useMemo<FeedPost[]>(() => {
    const leniPosts: FeedPost[] = [
      { pairId: 'presidential-candidacy', variantId: 'leni-candidacy' },
      { pairId: 'flood-control', variantId: 'leni-frame' },
    ]
    const saraPosts: FeedPost[] = [
      { pairId: 'presidential-candidacy', variantId: 'sara-candidacy' },
      { pairId: 'flood-control', variantId: 'dds-frame' },
    ]

    return affinity === 'sara'
      ? [...saraPosts, ...leniPosts]
      : [...leniPosts, ...saraPosts]
  }, [affinity])

  const activePost = route[postIndex]
  const activePair = postPairs[activePost.pairId]
  const activeVariant = getVariant(activePair, activePost.variantId)

  const restart = () => {
    setStep('intro')
    setAffinity(null)
    setAnswers([])
    setPostIndex(0)
    setReflection(null)
    setKept(false)
    setStartedAt(null)
    setSubmissionId(null)
    setSaving(false)
    setSaveError(null)
  }

  const chooseReaction = (reaction: Reaction) => {
    setAnswers((current) => [...current, reaction])

    if (postIndex < route.length - 1) {
      setPostIndex((current) => current + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    setStep('reveal')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const finishConsent = async (keep: boolean) => {
    if (!keep) {
      setKept(false)
      setStep('done')
      return
    }

    if (!affinity || !reflection || answers.length !== route.length || startedAt === null) {
      setSaveError('Kulang ang response data. Pakisubukang ulitin ang activity.')
      return
    }

    const currentSubmissionId = submissionId ?? crypto.randomUUID()
    setSubmissionId(currentSubmissionId)
    setSaving(true)
    setSaveError(null)

    try {
      await submitSalaminResponse({
        submissionId: currentSubmissionId,
        affinity,
        reactions: route.map((post, position) => ({
          ...post,
          position,
          reaction: answers[position],
        })),
        reflection,
        durationSeconds: Math.max(1, Math.round((Date.now() - startedAt) / 1000)),
      })
      setKept(true)
      setStep('done')
    } catch {
      setSaveError('Hindi na-save ang sagot. Pakisubukan ulit.')
    } finally {
      setSaving(false)
    }
  }

  if (step === 'reveal') {
    return (
      <RevealScreen
        posts={route}
        answers={answers}
        onChoose={(value) => {
          setReflection(value)
          setStep('lesson')
        }}
      />
    )
  }

  if (step === 'lesson') {
    const lessonPost = route[2]
    const lessonPair = postPairs[lessonPost.pairId]

    return (
      <LessonScreen
        pair={lessonPair}
        variant={getVariant(lessonPair, lessonPost.variantId)}
        onContinue={() => setStep('consent')}
      />
    )
  }

  if (step === 'consent') {
    return <ConsentScreen onAnswer={finishConsent} saving={saving} error={saveError} />
  }

  if (step === 'done') return <DoneScreen kept={kept} onRestart={restart} />

  return (
    <FeedShell>
      {step === 'intro' && (
        <IntroCard
          onStart={() => {
            setStartedAt(Date.now())
            setStep('side')
          }}
        />
      )}
      {step === 'side' && (
        <SidePicker
          onPick={(value) => {
            setAffinity(value)
            setPostIndex(0)
            setStep('posts')
          }}
        />
      )}
      {step === 'posts' && (
        <>
          <div className="post-flow screen-enter">
            <PoliticalPost pair={activePair} variant={activeVariant} />
          </div>
          <ReactionPanel key={postIndex} number={postIndex + 1} total={route.length} onChoose={chooseReaction} />
        </>
      )}
    </FeedShell>
  )
}

export default App
