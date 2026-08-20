package com.pdfmaker

import android.content.Intent
import android.os.Bundle
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

class MainActivity : ReactActivity() {

  override fun getMainComponentName(): String = "PDFMaker"

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    if (intent?.action == Intent.ACTION_VIEW || intent?.action == Intent.ACTION_SEND) {
      val uri = intent?.data ?: intent?.getParcelableExtra<android.net.Uri>(Intent.EXTRA_STREAM)
      if (uri != null) {
        // Store the URI in a companion object to access from React Native
        pendingPdfUri = uri.toString()
      }
    }
  }

  override fun onNewIntent(intent: Intent) {
    super.onNewIntent(intent)
    setIntent(intent)
    if (intent?.action == Intent.ACTION_VIEW || intent?.action == Intent.ACTION_SEND) {
      val uri = intent?.data ?: intent?.getParcelableExtra<android.net.Uri>(Intent.EXTRA_STREAM)
      if (uri != null) {
        pendingPdfUri = uri.toString()
      }
    }
  }

  companion object {
    var pendingPdfUri: String? = null
  }

  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}