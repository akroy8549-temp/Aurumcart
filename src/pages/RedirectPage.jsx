import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'
import { getProductById, logProductClick } from '../lib/api'

export default function RedirectPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    redirectToAffiliate()
  }, [id])

  const redirectToAffiliate = async () => {
    try {
      const product = await getProductById(id)
      
      if (!product || !product.affiliate_link) {
        console.error('Product or affiliate link not found')
        setTimeout(() => navigate('/'), 2000)
        return
      }

      // Log the click
      await logProductClick(id)

      // Redirect to affiliate link
      window.location.href = product.affiliate_link
    } catch (error) {
      console.error('Error redirecting:', error)
      setTimeout(() => navigate('/'), 2000)
    }
  }

  return <LoadingSpinner />
}
