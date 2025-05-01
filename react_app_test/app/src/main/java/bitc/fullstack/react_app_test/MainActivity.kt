package bitc.fullstack.react_app_test


import android.annotation.SuppressLint
import android.os.Bundle
import android.util.Log
import android.webkit.ConsoleMessage
import android.webkit.WebChromeClient
import android.webkit.WebSettings
import android.webkit.WebView
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {

  lateinit var webView: WebView

  @SuppressLint("SetJavaScriptEnabled")
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_main)  // XML에 정의된 레이아웃 사용

    webView = findViewById(R.id.webView)

    // WebView 설정
    webView.settings.apply {
      javaScriptEnabled = true
      domStorageEnabled = true
      cacheMode = WebSettings.LOAD_DEFAULT
      allowFileAccess = true
      allowContentAccess = true

      // CORS 문제 해결을 위한 추가 설정
      allowFileAccessFromFileURLs = true
      allowUniversalAccessFromFileURLs = true
    }


    // 콘솔 로그 확인용
    webView.webChromeClient = object : WebChromeClient() {
      override fun onConsoleMessage(consoleMessage: ConsoleMessage?): Boolean {
        Log.d("WebView", consoleMessage?.message() ?: "")
        return true
      }
    }

    // React 앱 로드
    webView.loadUrl("file:///android_asset/index.html#/")
  }
}
