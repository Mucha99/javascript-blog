"use strict";
{
  const optArticleSelector = ".post",
    optTitleSelector = ".post-title",
    optTitleListSelector = ".titles",
    optArticleTagsSelector = ".post-tags .list",
    optArticleAuthorSelector = ".post-author";

  const titleClickHandler = function (event) {
    event.preventDefault();
    const clickedElement = this;
    // console.log("Link was clicked!");
    // console.log(event);
    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll(".titles a.active");

    for (let activeLink of activeLinks) {
      activeLink.classList.remove("active");
    }

    /* [DONE] add class 'active' to the clicked link */
    clickedElement.classList.add("active");

    // console.log("clickedElement:", clickedElement);

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll(".posts .active");

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove("active");
    }

    /* [DONE] get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute("href");
    // console.log(articleSelector);

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
    // console.log(targetArticle);

    /* [DONE] add class 'active' to the correct article */
    targetArticle.classList.add("active");
  };

  function generateTitleLinks(customSelector = "") {
    /* [DONE] remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = "";

    /* find all the articles and save them to variable: articles */
    const articles = document.querySelectorAll(
      optArticleSelector + customSelector
    );
    let html = "";

    /* [DONE] for each article */
    for (let article of articles) {
      /* [DONE] get the article id */
      const articleId = article.getAttribute("id");
      // console.log(articleId);
      /* [DONE] find the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* [DONE] create HTML of the link */
      const linkHTML =
        '<li><a href="#' +
        articleId +
        '"><span>' +
        articleTitle +
        "</span></a></li>";
      // console.log(linkHTML);
      /* [DONE] insert link into titleList */
      html = html + linkHTML;
      // console.log(html);
    }

    titleList.innerHTML = html;

    const links = document.querySelectorAll(".titles a");
    for (let link of links) {
      link.addEventListener("click", titleClickHandler);
    }
  }

  generateTitleLinks();

  // Moduł 7.2

  function generateTags() {
    /* [DONE] find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* [IN PROGRESS] START LOOP: for every article: */
    for (let article of articles) {
      /* find tags wrapper */
      const wrapper = article.querySelector(optArticleTagsSelector);
      // console.log(wrapper);

      /* make html variable with empty string */
      let html = "";

      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute("data-tags");
      // console.log(articleTags);

      /* split tags into array */
      const articleTagsArray = articleTags.split(" ");
      // console.log(articleTagsArray);

      /* START LOOP: for each tag */
      for (let tag of articleTagsArray) {
        // console.log(tag);
        /* generate HTML of the link */
        const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + "</a></li>";
        // console.log(linkHTML);

        /* add generated code to html variable */
        html = html + linkHTML;
        // console.log(html);
      } /* END LOOP: for each tag */
      /* insert HTML of all the links into the tags wrapper */
      wrapper.innerHTML = html;
    } /* END LOOP: for every article: */
  }

  generateTags();

  function tagClickHandler(event) {
    /* [DONE] prevent default action for this event */
    event.preventDefault();

    /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute("href");

    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace("#tag-", "");

    /* find all tag links with class active */
    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

    /* START LOOP: for each active tag link */
    for (let activeTag of activeTags) {
      /* remove class active */
      activeTag.classList.remove("active");
    } /* END LOOP: for each active tag link */

    /* find all tag links with "href" attribute equal to the "href" constant */
    const clickedTags = document.querySelectorAll('a[href="' + href + '"]');

    /* START LOOP: for each found tag link */
    for (let clickedTag of clickedTags) {
      /* add class active */
      clickedTag.classList.add("active");
    } /* END LOOP: for each found tag link */

    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }

  function addClickListenersToTags() {
    /* find all links to tags */
    const tags = document.querySelectorAll('a[href^="#tag-"]');

    /* START LOOP: for each link */
    for (let tag of tags) {
      /* add tagClickHandler as event listener for that link */
      tag.addEventListener("click", tagClickHandler);
    } /* END LOOP: for each link */
  }

  addClickListenersToTags();

  function generateAuthors() {
    const articles = document.querySelectorAll(optArticleSelector);

    for (let article of articles) {
      const authorsWrapper = article.querySelector(optArticleAuthorSelector);
      let html = "";

      const articleAuthors = article.getAttribute("data-author");

      const linkHTML =
        '<a href="#author-' + articleAuthors + '">' + articleAuthors + "</a>";
      html = html + linkHTML;
      authorsWrapper.innerHTML = html;
    }
  }
  generateAuthors();
}
