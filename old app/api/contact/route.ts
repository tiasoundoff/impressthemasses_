
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // In a local environment, we'll just log the submission.
    // In a real implementation, you would save this to a database.
    console.log('New contact form submission:', { name, email, subject, message });

    return NextResponse.json({
      success: true,
      submissionId: new Date().getTime().toString() // Fake a submission ID
    })

  } catch (error) {
    console.error('Error creating contact submission:', error)
    return NextResponse.json(
      { error: 'Failed to submit contact form' },
      { status: 500 }
    )
  }
}
