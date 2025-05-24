using System;
using System.Collections;
using System.Diagnostics;
using System.Numerics;
using UnityEngine;
using UnityEngine.Networking;
using UnityEngine.UI;

public class BannerImageLoadController : MonoBehaviour
{
    private Sprite banner01;
    private String objectName;

    void Start()
    {
        objectName = this.name;
        StartCoroutine(GetTexture());
    }

    IEnumerator GetTexture()
    {
        UnityWebRequest www = UnityWebRequestTexture.GetTexture("https://sample-portfolio.yukinissie.com/images/sample-og-image.jpg");
        yield return www.SendWebRequest();

        if (www.result != UnityWebRequest.Result.Success)
        {
            UnityEngine.Debug.Log("ImageLoadERROR:" + www.error);
        }
        else
        {
            Texture2D tex = ((DownloadHandlerTexture)www.downloadHandler).texture;
            banner01 = Sprite.Create(tex, new Rect(0, 0, tex.width, tex.height), UnityEngine.Vector2.zero);
            var bancomponent = this.gameObject.GetComponent<Image>();
            bancomponent.sprite = banner01;
        }
    }
}
