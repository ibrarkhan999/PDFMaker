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
    handleIntent(intent)
  }

  override fun onNewIntent(intent: Intent) {
    super.onNewIntent(intent)
    setIntent(intent)
    handleIntent(intent)
  }

  private fun handleIntent(intent: Intent?) {
    if (intent == null) return

    when (intent.action) {
      Intent.ACTION_VIEW -> {
        intent.data?.let { uri ->
          pendingPdfUri = uri.toString()
        }
      }
      Intent.ACTION_SEND -> {
        val uri = if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.TIRAMISU) {
          intent.getParcelableExtra(Intent.EXTRA_STREAM, android.net.Uri::class.java)
        } else {
          @Suppress("DEPRECATION")
          intent.getParcelableExtra<android.net.Uri>(Intent.EXTRA_STREAM)
        }
        uri?.let {
          pendingPdfUri = it.toString()
        }
      }
    }
  }

  companion object {
    var pendingPdfUri: String? = null
  }

  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}