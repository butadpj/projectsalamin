export type SalaminSubmission = {
  submissionId: string
  affinity: 'leni' | 'sara'
  reactions: Array<{
    pairId: 'presidential-candidacy' | 'flood-control'
    variantId: 'leni-candidacy' | 'sara-candidacy' | 'leni-frame' | 'dds-frame'
    position: number
    reaction: 'believe' | 'check' | 'share' | 'doubt'
  }>
  reflection: 'more-belief' | 'more-doubt' | 'same' | 'unsure'
  durationSeconds: number
}

export async function submitSalaminResponse(submission: SalaminSubmission) {
  const apiBaseUrl = import.meta.env.VITE_SALAMIN_API_URL?.replace(/\/$/, '')
  if (!apiBaseUrl) throw new Error('VITE_SALAMIN_API_URL is not configured.')

  const response = await fetch(`${apiBaseUrl}/api/responses`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(submission),
  })

  if (!response.ok) throw new Error('The response could not be saved.')
}
